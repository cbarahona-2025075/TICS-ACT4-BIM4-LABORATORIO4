# TICS-ACT4-BIM4-LABORATORIO4
Proyecto para el laboratorio 4 de TICS para Integrar consumo de APIs, manipulación del DOM y control de calidad del código mediante Husky y ESLint en  una mini aplicación web.

## ¿Qué es este proyecto?

Es una pequeña página web que muestra una lista de productos. Los productos no están escritos a mano en el código, sino que se obtienen de una API (una página en internet que nos da datos) usando JavaScript, además, la página tiene un buscador para encontrar productos por nombre.

También se configuró **ESLint** (una herramienta que revisa que el código esté bien escrito) y **Husky** (una herramienta que no deja hacer un commit si el código tiene errores).

## ¿Qué hace la aplicación?

1. Cuando abres la página, automáticamente pide los productos a una API que se llama Fake Store API.
2. Los datos que llegan se muestran en pantalla, cada producto en su propia tarjeta con imagen, nombre y precio.
3. Hay un cuadro de texto donde puedes escribir el nombre de un producto, y al presionar el botón "Buscar", se filtran y muestran solo los productos que coinciden con lo que escribiste.
4. Si por alguna razón no se pueden cargar los productos (por ejemplo, no hay internet), aparece un mensaje avisando que hubo un error.

## Tecnologías que se usaron

- **HTML** para armar la estructura de la página.
- **CSS** para darle color y estilo.
- **JavaScript** para traer los datos de la API y mostrarlos en pantalla.
- **ESLint** para revisar que el código no tenga errores.
- **Husky** para bloquear los commits si el código tiene errores.
- **pnpm** como gestor de paquetes (en vez de npm).

## Estructura de archivos

```
├── index.html          -> la estructura de la página
├── script.js            -> el código que trae los productos y hace el buscador
├── style.css             -> los estilos y colores de la página
├── eslint.config.js  -> configuración de ESLint
├── .husky/
│   └── pre-commit         -> lo que se ejecuta antes de cada commit
├── package.json
└── README.md
```

## Cómo instalar el proyecto

Primero se clona el repositorio y se instalan las dependencias:

```bash
git clone <URL-del-repositorio>
cd <nombre-de-la-carpeta>
pnpm install
```

## Cómo ejecutar la aplicación

Importante: No se puede abrir el `index.html` haciendo doble clic, porque el navegador no deja que JavaScript pida datos a la API si el archivo se abre así.

Para que funcione bien, se debe usar la extensión **Live Server** de VSC:

1. Instalar la extensión "Live Server" en VSC.
2. Dar clic derecho sobre el archivo `index.html`.
3. Elegir la opción "Open with Live Server".
4. Se va a abrir el navegador automáticamente y ahí sí va a cargar todo bien.

## Cómo se configuró ESLint

Primero se instaló ESLint junto con un paquete llamado `globals`, que sirve para que ESLint entienda que cosas como `document`, `fetch` o `console` son normales en un navegador (si no, marcaría error aunque el código esté bien):

```bash
pnpm add -D eslint @eslint/js globals
```

Después se creó el archivo `eslint.config.js` con esta configuración:

```javascript
import js from "@eslint/js";
import globals from "globals";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    }
];
```

Para revisar el código manualmente y ver si hay errores, se usa este comando:

```bash
pnpm exec eslint .
```

## Cómo se configuró Husky

Se instaló Husky y se inicializó:

```bash
pnpm add -D husky
pnpm exec husky init
```

Esto crea una carpeta llamada `.husky/` con un archivo adentro llamado `pre-commit`. Ahí se escribió esta línea:

```bash
pnpm exec eslint .
```

### ¿Cómo funciona esto?

Cada vez que uno intenta hacer un commit con `git commit`, Husky se activa automáticamente antes de que el commit se guarde, y corre ESLint para revisar el código.

- Si ESLint encuentra algún error (por ejemplo, una variable que se creó pero nunca se usó), **el commit se bloquea** y no se puede continuar hasta corregir el error.
- Si el código está limpio, sin errores, el commit se completa sin problema.

Esto sirve para no subir código con errores al repositorio.

## Prueba que se realizó

Para comprobar que Husky y ESLint funcionan bien, se hizo lo siguiente:

1. Se agregó a propósito una variable que no se usaba en `script.js`, para provocar un error.
2. Se intentó hacer un commit.
3. Husky bloqueó el commit y mostró el error de ESLint en la terminal.
4. Se eliminó la variable que causaba el error.
5. Se volvió a intentar el commit, y esta vez sí se completó sin problema.

Esto demuestra que la configuración de Husky y ESLint está funcionando correctamente.

## Capturas de las pruebas realizadas

### 1. Aplicación funcionando (productos cargados y buscador)

<img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/c7b213a7-4a38-44a5-be8a-abaabeae2873" />

<img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/bbc04b30-5d75-45d1-ad7f-6e5ecb048267" />

### 2. Commit bloqueado por Husky (por el error de ESLint)

<img width="1546" height="922" alt="Captura de pantalla 2026-09-20 202724" src="https://github.com/user-attachments/assets/683eba04-1e14-4038-bf79-e9a52fdee9a8" />
