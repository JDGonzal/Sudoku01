const numSelected = null;
const tileSelected = null;

const errors = 0;

const board = [
  '--74916-5',
  '2---6-3-9',
  '-----7-1-',
  '-586----4',
  '--62--187',
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
    numberList.classList.add('number'); // le asignamos la clase
    // Ponemos en pantalla como hijo de `id = "digits"`
    document.getElementById('digits').appendChild(numberList);
  }
};

// Tablero 9x9
for (let x = 0; x < 9; x++) {
  for (let y = 0; y < 9; y++) {
    // <div id="0-0"></div>
    const tileList = document.createElement('div');
    tileList.id = x.toString() + '-' + y.toString(); // definimos `id`
    tileList.classList.add('tile'); // le asignamos la clase
    // Ponemos en pantalla como hijo de `id = "board"`
    document.getElementById('board').appendChild(tileList);
  }
}
