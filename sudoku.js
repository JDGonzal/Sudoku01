let numSelected = null;
// const tileSelected = null;

let errors = 0;

const WHICH = 2;
const board = [
  ['--74916-5', '2---6-3-9', '-----7-1-', '-586----4', '--3----9-',
    '--62--187', '9-4-7---2', '67-83----', '81--45---'],
  ['8--4--63-', '-12-8----', '-4-1-----', '------5-7', '-7-9-2-1-',
    '9-4------', '-----1-5-', '----4-37-', '-35--8--2'],
  ['-93-6---4', '------7--', '--8----26', '---69----', '64-----73',
    '----13---', '32----8--', '--7------', '9---4-16-'],
];

const solution = [
  ['387491625', '241568379', '569327418', '758619234', '123784596',
    '496253187', '934176852', '675832941', '812945763'],
  ['897425631', '312689745', '546173928', '123864597', '678952413',
    '954317286', '769231854', '281546379', '435798162'],
  ['293768514', '564231798', '178954326', '832697451', '641825973',
    '759413682', '326179845', '417586239', '985342167'],
];

let rows = []; // Filas del `board`
let cols = []; // Columnas del `board`
let s3x3 = []; // Cuadros 3x3 del `board`
let delta = 0; // Para el arreglo `s3x3`

// Cuando se muestra la pantalla
window.onload = () => {
  setGame(); // Llamo esta función
};

// Inicializa el juego
const setGame = () => {
  // Los digitos de 1-9
  for (let i = 1; i <= 9; i++) {
    // <div id="1">1</div> en js
    const numberList = document.createElement('div');
    numberList.id = i; // definimos el `id`
    numberList.innerText = i; // El texto a mostrar
    // Añadimos la _escucha_ el evento `click`
    numberList.addEventListener('click', selectNumber);
    numberList.classList.add('number'); // le asignamos la clase
    // Ponemos en pantalla como hijo de `id = "digits"`
    document.getElementById('digits').appendChild(numberList);
  }
  // Tablero 9x9
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
    // <div id="0-0"></div>
      const tileList = document.createElement('div');
      tileList.id = x.toString() + '-' + y.toString(); // definimos `id`
      // Poblamos (Polulate) la cuadrícula con `board`
      if (board[WHICH][x][y] !== '-') {
        tileList.innerText = board[WHICH][x][y];
        tileList.classList.add('tile-start');
      }
      // para poner las `.horizontal-line` y las `.vertical-line`
      if (x === 2 || x === 5) {
        tileList.classList.add('horizontal-line');
      }
      if (y === 2 || y === 5) {
        tileList.classList.add('vertical-line');
      }
      // Añadimos la _escucha_ el evento `click`
      tileList.addEventListener('click', selectTile);
      tileList.classList.add('tile'); // le asignamos la clase
      // Ponemos en pantalla como hijo de `id = "board"`
      document.getElementById('board').appendChild(tileList);
    }
  }
};

// Va a ser llamado con el `click` de los q tienen clase `number`
function selectNumber () {
  if (numSelected != null) {
    numSelected.classList.remove('number-selected');
  }
  numSelected = this; // asigno el valor de `numberList`
  numSelected.classList.add('number-selected'); // sudoku.css
};

// Va a ser llamado con el `click` de los q tienen clase `tile`
function selectTile () {
  if (numSelected) {
    if (this.innerText !== '') return; // Si tiene datos no hace nada

    // Establecemos el comparativo con la `solution`
    // Se crea un arreglo con los valores de `x` y `y``
    const coords = this.id.split('-'); // Crea un arreglo
    // Llevo a dos variable en forma de Enteros
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);

    // Si es igual a la solución lo asigno a la cuadrícula
    if (solution[WHICH][x][y] === numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1; // Incremento los errores.
      // Lo muestro en pantalla el valor incrementado
      document.getElementById('errors').innerText = errors;
    }
  } else if (this.id === '4-4') { testAuto1(); } // Botón invisible
};

// Localiza el Indice para el arreglo o cuadrado de 3x3
function getIndexSquare3x3 (x, y) {
  if ([0, 3, 6].includes(x)) delta = x;
  return Math.floor((x + delta) / 3) + Math.floor((y + delta) / 3);
}

// Cargamos los tres arreglos para hacer las validaciones
const loadingArrays = (puzzle) => {
  delta = 0; // Reinicializo `delta` antes del recorrido
  rows = []; // Reinicializo Filas del `board`
  cols = []; // Reinicializo Columnas del `board`
  s3x3 = []; // Reinicializo Cuadros 3x3 del `board`
  // Recorrido para cargar los tres arreglos o matrices
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (x === 0) {
        cols.push(puzzle[x][y].replace('-', '0')); // Creo celda array
        rows.push(puzzle[y].replaceAll('-', '0')); // Creo celda array
        // puzzle[y] = [];
      } else {
        cols[y] = cols[y].concat(puzzle[x][y].replace('-', '0'));
      }
      const index = getIndexSquare3x3(x, y); // Cargo el Index
      if ([0, 3, 6].includes(x) && [0, 3, 6].includes(y)) {
        s3x3[index] = ''; // Inicializo cada cuadrado 3x3
      }
      s3x3[index] = s3x3[index].concat(puzzle[x][y].replace('-', '0'));
    }
  };
};

const testAuto1 = () => {
  loadingArrays(board[WHICH]);
  showSolution(solveSudoku(board[WHICH]));
};

const EMPTY = '-';
const possibleNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// retorno el string con un caracter cambiado en una posición
function replaceIdx (str, val, idx) {
  return str.slice(0, idx) + val + str.slice(idx + 1);
};

const solveSudoku = (puzzle) => {
  const emptySpaces = []; // Posiciones de espacios vacíos
  delta = 0; // Inicializamos `delta` antes del recorrido
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const index = getIndexSquare3x3(x, y);
      if (puzzle[x][y] === EMPTY) {
        // Almacenamos objeto
        emptySpaces.push({ row: x, col: y, ind: index });
      }
    }
  }

  // Funcion recursiva para ciclar en si misma
  function recurse (emptySpaceIndex) {
    // Se sale si llega al límite de tamaño del arreglo
    if (emptySpaceIndex >= emptySpaces.length) return true;
    // cargamos constantes del objeto almacenado
    const { row, col, ind } = emptySpaces[emptySpaceIndex];
    // Un ciclo parar recorrer los valores posibles
    for (let i = 0; i < possibleNumbers.length; i++) {
      const num = possibleNumbers[i]; // Asignamos a una variable
      // Verificamos si es válido
      if (isValid(num, col, row, ind)) {
        // Cargamos el tablero
        puzzle[row] = replaceIdx(puzzle[row], num, col);
        loadingArrays(puzzle); // recargamos los otros arreglos
        // llamamos esta misma función de `recurse()`
        if (recurse(emptySpaceIndex + 1)) return true;
        // Un paso atrás de ser necesario
        puzzle[row] = replaceIdx(puzzle[row], EMPTY, col);
        loadingArrays(puzzle); // recargamos los otros arreglos
      }
    }

    return false; // Finalizo el proceso de `recurse()`
  }
  recurse(0); // Llamo la función interna `recurse()`
  console.table(puzzle);
  return puzzle; // devuelvo el valor del `puzzle`
};

// Validamos si un número se puede poner en la casilla vacía
function isValid (num, col, row, ind) {
  if (rows[row].includes(num)) return false;
  if (cols[col].includes(num)) return false;
  if (s3x3[ind].includes(num)) return false;
  return true;
}

// Muestro la solución en pantalla
const showSolution = (puzzle) => {
  // Recorrido de la matriz puzzle y lo voy poniendo en pantalla
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const num = document.getElementById(x + '-' + y).innerText;
      if (num === '') { // Si está vacío pongo el número
        document.getElementById(x + '-' + y).innerText = puzzle[x][y];
      }
    }
  };
};
