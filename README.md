# SUDOKU01

[![How to Build Sudoku JavaScript Tutorial](images/2024-11-19_182450.png "How to Build Sudoku JavaScript Tutorial")](https://www.youtube.com/watch?v=S4uRtTb8U-U)

## 01. Empezando con el archivo **`sudoku.html`**
1. Crear tres (3) archivos en la raíz del proyecto:
* **`sudoku.html`**
* **`sudoku.css`**
* **`sudoku.js`**

2. Empeando con el archivo **`sudoku.html`**, empezamos escribiendo 
`html` y seleccionamos `html:5`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```
3. Cambiamos el `<title>` a `Sudoku`.
4. creamos el `<footer>` debajo del `</body>` e invocamos el `script` en el `<head>` y el link del `"stylesheet"` en el `<footer>`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sudoku</title>

  <script type="module" src="sudoku.js"></script>
</head>
<body>
  
</body>
<footer>
  <link rel="stylesheet" href="sudoku.css">
</footer>
</html>
```
5. En el `<body>` invocamos un `<h1>` y un `<h2>`:
```html
<body>
  <h1>Sudoku</h1>
  <hr>
  <h2 id="errors">0</h2>  
</body>
```
6. En el `<body>` de **`sudoku.html`**, ponemos el tablero de 9x9:
```html
  <!-- 9x9 board -->
  <div id = "board">
```
* Con javascript, vamos a llenar el contenido de este tablero
7. Ponemos mas en el `<body>`, debajo de `<div id="digits">`:
```html
  <br>
  <div id="digits"></div>
```

## 02. Seguimos con el archivo **`sudoku.css`**
1. Cargamos el tema que va a usar el `<body>`:
```css
body {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
```
2. Luego como van a ser los `<hr>`:
```css
hr {
  width: 500px;
}
```
3. El `id = "errors"`:
```css
#errors {
  color: coral;
}
```
4. Como llenamos el `id = "board"`:
```css
#board {
  width: 450px;
  height: 450px;

  background-color: yellow;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
```
5. Hacemos estilos para `id="digits">`:
```css
#digits {
  width: 450px;
  height: 450px;

  background-color: yellow;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;  
}
```

>[!NOTE]  
>Así se ve la pantalla en un browser:  
>![El browser con lo básico](images/2024-11-20_115855.png)

6. Ponemos mas en el **`sudoku.css`**, para una futura clase de nombre
`class = "tile"`:
```css
.tile {
  width: 48;
  height: 48;
  border: 1px solid lightgray;

  /* Text */
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
7. En el archivo **`sudoku.css`**, para una futura clase de nombre
`class = "number"`, similar al anterior:
```css
  width: 48;
  height: 48;
  border: 1px solid black;

  /* Text */
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;  
```
>[!IMPORTANT]
>### Precondiciones para trabajar con `javascript`
>1. Tener el Editor [Visual Studio Code]>(https://code.visualstudio.com/insiders/).
>2. Extensiones insaladas dentro de 
>`Visual Studio Code`:  
>  * [Better Comments](https://marketplace.visualstudio.com/items?>itemName=aaron-bond.better-comments) 
>de [Aaron Bond](https://aaronbond.co.uk/).
>  * [Error Lens](https://marketplace.visualstudio.com/items?>itemName=usernamehw.errorlens) 
>de [Alexander](https://marketplace.visualstudio.com/publishers/usernamehw).
>  * [Javascript-Essentials](https://marketplace.visualstudio.com/items?itemName=Gydunhn.javascript-essentials)
>  de [Gydunhn](https://marketplace.visualstudio.com/publishers/Gydunhn),  
>  Este instala un paquete con:
>    * ESLint
>    * npm Intellisense 
>    * IntelliCode
>    * JavaScript (ES6) code snippets
>    * Debugger for Firefox
>    * Path Intellisense
>    * Formatting Toggle
>  * [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
>  de [Ritwick Dey](https://marketplace.visualstudio.com/publishers/ritwickdey).
>  * [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)
>  de [Kiss Tamás](https://marketplace.visualstudio.com/publishers/kisstkondoros) 
>3. Instalar `nvm` descargando el instalador desde este sitio:
[nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).
>4. Instalar el `node`, que a su vez
>trae el `npm` basado en este sitio: 
>[Instalar múltiples versiones de Node.js en Windows](https://rafaelneto.dev/blog/instalar-multiples-versiones-nodejs-windows/).  
>Con el `nvm` permite múltiples versiones
>del `node`.
>5. El programa `pnpm` es similar al `npm`, siendo un mejor >empaquetador.  
>Este lo puede conseguir con las instrucciones de este sitio
>[pnpm Installation](https://pnpm.io/installation).

>[!TIP]  
>### ESLint o Analizador estático de código fuente de `javascript`
>1. Tener instalado de forma global el `eslint`, con el comando:
>```bash
>npm install -g eslint
>```
>* **Esto solo se hace una vez y toca con el comando `npm`.**
>2. Instalar para el proyecto el paquete `standard`:
>```bash
>pnpm install standard -D
>```
>3. Se creó el archivo **`package.json`** con al menos esta información:
>```json
>{
>  "devDependencies": {
>    "standard": "^17.1.0"
>  }
>}
>```
>4. Crear el archivo **`.eslintrc.json`**, con este contenido:
>```json
> {
>   "extends": ["standard"],
>   "rules": {
>     "semi" : [2, "always"],
>     "comma-dangle": [2, "always-multiline"] 
>   }
> }
>```
>4. Presiono en `Visual Studio Code` las teclas: 
> [`Ctrl`] + [`Shift`] + [`P`]  
> y selecciono o busco `Restart ESLint Server`

## 03. Ponemos el tablero y los números desde **`sudoku.js`**

>[!TIP]  
>Esta es la solición propuesta para implementar en el archivo 
>**`sudoku.js`**:  
>![](images/2024-11-20_120909.png)

1. Empezamos inicializando las variables a utilizar:
```js
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
```
2. Creamos el manejo de `window.onload`, llamando una función de
nombre `setGame()`:
```js
window.onload = () => {
  setGame(); // Llamo esta función
};
```
3. Hacemos la función que estamos llamando:
```js
const setGame = () => { };
```
4. Empezamos con un ciclo `for` dentro del método `setGame()`:
```js
  for (let i = 1; i <= 9; i++) {}
```
5. En el ciclo `for` vamos a poner los números del 1 al 9 y luego
ponerlos como un `<div>` en pantalla, como un hijo de `id = "digits"`:
```js
  for (let i = 1; i <= 9; i++) {
    // <div id="1">1</div> en js
    const numberList = document.createElement('div');
    numberList.id = i; // definimos el `id`
    numberList.innerText = i; // El texto a mostrar
    numberList.classList.add('number'); // le asignamos la clase
    // Ponemos en pantalla como hijo de `id = "digits"`
    document.getElementById('digits').appendChild(numberList);
  }
```

>[!WARNING]  
>Corregí en **`sudoku.css`** las clases `.tile` y `.number`, las
>propiedades de `width:` y `height:` agretando la partícula `px`,
>después del número o el valor;

6. En el archivo **`sudoku.css`**, le agregamos un espacio en lo
relacionado a la clase `.number` y cambiamos el `width:` y el `height:`:
```css
.number {
  width: 44px;
  height: 44px;
  border: 1px solid black;
  margin: 2px;

  ...
}
```

>[!NOTE]  
>Hasta acá así se ve el juego en el browser:  
>![Lista de numeros abajo](images/2024-11-20_170521.png)

7. Hacemos algo similar para mostar la tabla en pantalla
en el archivo **`sudoku.js`**:
```js
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
```

8. Quitamos de **`sudoku.css`** las lineas de 
`background-color: yellow;`, tanto en el `#board`, como en el 
`#digits`.

>[!NOTE]  
>Así se ve el tablero en el browser hasta el momento:  
>![](images/2024-11-20_180309.png)

>[!WARNING]  
>Como se ejecutaron elementos de `npm` y/o `pnpm`, este genera un 
>gigantesco directorio de nombre "`node_modules`", por tanto se deben
>crear el archivo **`.gitignore`**, con al menos esta información, así 
>se evita subir información innecesaria al repositorio:
>```py
># Logs
>logs
>*.log
>npm-debug.log*
>yarn-debug.log*
>yarn-error.log*
>pnpm-debug.log*
>lerna-debug.log*
>pnpm-lock.*
>package-lock.*
>
>node_modules
>dist
>dist-ssr
>*.local
>
># Editor directories and files
>.vscode/*
>!.vscode/extensions.json
>.idea
>.DS_Store
>*.suo
>*.ntvs*
>*.njsproj
>*.sln
>*.sw?
>```
