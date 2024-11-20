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

## 02. Seguimos eon el archivo **`sudoku.css`**
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
