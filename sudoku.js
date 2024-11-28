import getBoard from './board.js';
import getSolution from './solution.js';

let numSelected = null;
// const tileSelected = null;

let errors = 0;

const WHICH = 2;

let board = [];
let solution = [];

// Cuando se muestra la pantalla
window.onload = () => {
  setGame(); // Llamo esta función
};

// Inicializa el juego
const setGame = () => {
  // Cargamos el `board`
  board = getBoard(WHICH);
  // Cargamos el `solution`
  solution = getSolution(WHICH);
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
  } else if (this.id === '4-4') {
    console.time('testAuto1');
    testAuto1();
  } // Botón invisible
};

const testAuto1 = () => {
  showSolution(solveSudoku(board));
  console.timeLog('testAuto1');
};

const EMPTY = '-';
const possibleNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// retorno el string con un caracter cambiado en una posición
function replaceIdx (str, val, idx) {
  return str.slice(0, idx) + val + str.slice(idx + 1);
};

const solveSudoku = (puzzle) => {
  const emptySpaces = []; // Posiciones de espacios vacíos
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      // const index = getIndexSquare3x3(x, y);
      if (puzzle[x][y] === EMPTY) {
        // Almacenamos objeto
        emptySpaces.push({ col: x, row: y });
      }
    }
  }

  // Funcion recursiva para ciclar en si misma
  function recurse (emptySpaceIndex) {
    // Se sale si llega al límite de tamaño del arreglo
    if (emptySpaceIndex >= emptySpaces.length) return true;
    // cargamos constantes del objeto almacenado
    const { col, row } = emptySpaces[emptySpaceIndex];
    // Un ciclo parar recorrer los valores posibles
    for (let i = 0; i < possibleNumbers.length; i++) {
      const num = possibleNumbers[i]; // Asignamos a una variable
      // Verificamos si es válido
      if (isValid(num, col, row, puzzle)) {
        // Cargamos el tablero
        puzzle[col] = replaceIdx(puzzle[col], num, row);
        // llamamos esta misma función de `recurse()`
        if (recurse(emptySpaceIndex + 1)) return true;
        // Un paso atrás de ser necesario
        puzzle[col] = replaceIdx(puzzle[col], EMPTY, row);
      }
    }

    return false; // Finalizo el proceso de `recurse()`
  }
  recurse(0); // Llamo la función interna `recurse()`
  console.table(puzzle);
  return puzzle; // devuelvo el valor del `puzzle`
};

// Validamos si un número se puede poner en la casilla vacía
function isValid (num, col, row, board) {
  // Check col, row, 3x3 matrix
  for (let i = 0; i < board.length; i++) {
    // Verifico en filas `row` y en las columnas `col`
    if (board[col][i] === num || board[i][row] === num) return false;

    // Check 3x3
    const startCol = Math.floor(col / 3) * 3;
    const startRow = Math.floor(row / 3) * 3;
    for (let x = startCol; x < startCol + 3; x++) {
      for (let y = startRow; y < startRow + 3; y++) {
        if (board[x][y] === num) return false;
      }
    }
  }
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
