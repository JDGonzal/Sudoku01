let numSelected = null;
// const tileSelected = null;

let errors = 0;

const board = [
  '--74916-5',
  '2---6-3-9',
  '-----7-1-',
  '-586----4',
  '--62--187',
  '--3-----9',
  '9-4-7---2',
  '67-83----',
  '81--45---',
];

const solution = [
  '387491625',
  '241568379',
  '569327418',
  '758619234',
  '123784596',
  '496253187',
  '934176852',
  '675832941',
  '812945763',
];

const rows = []; // Filas del `board`
const columns = []; // Columnas del `board`
const squares = []; // Cuadros 3x3 del `board`

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
      if (board[x][y] !== '-') {
        tileList.innerText = board[x][y];
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
    if (solution[x][y] === numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1; // Incremento los errores.
      // Lo muestro en pantalla el valor incrementado
      document.getElementById('errors').innerText = errors;
    }
  } else if (this.id === '4-4') { testAuto1(); } // Botón invisible
};

const loadingArrays = () => {
  let i = 0; // Número de cada cuadro 3x3
  let delta = 0; // Incremento de cada cuadro 3x3
  // Recorrido para cargar los tres arreglos o matrices
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (x === 0) {
        columns.push(board[x][y].replace('-', '0')); // Creo celda array
        rows.push(board[y].replaceAll('-', '0')); // Creo celda array
      } else {
        columns[y] = columns[y].concat(board[x][y].replace('-', '0'));
      }
      // if ((x===0 || x===3 || x===6) && (y===0 || y===3 || y===6))
      if ([0, 3, 6].includes(x) && [0, 3, 6].includes(y)) {
        squares.push(board[x][y].replace('-', '0')); // Creo celda array
        if ([0, 3, 6].includes(x)) delta = x;
        // console.log(`x,y: (${x},${y}) square:${squares.length} `);
      } else {
        i = Math.floor((x + delta) / 3) + Math.floor((y + delta) / 3);
        // console.log(`x,y: (${x},${y}) i:${i} Delta:${delta}`);
        squares[i] = squares[i].concat(board[x][y].replace('-', '0'));
      }
    }
  };
  console.log('rows: ', rows);
  console.log('columns: ', columns);
  console.log('squares:', squares);
};

const testAuto1 = () => {
  loadingArrays();
};
