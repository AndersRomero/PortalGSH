# Portal de Noticias

Este es un proyecto de un portal de noticias simple creado con React y TypeScript.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (versión 16 o superior)
*   [npm](https://www.npmjs.com/) (generalmente viene con Node.js)

## Instalación

1.  Clona este repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd portal-noticias
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm start
```

Esto abrirá la aplicación en tu navegador en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto sigue la estructura estándar de Create React App:

*   **`public/`**: Contiene los archivos estáticos como `index.html`.
*   **`src/`**: Contiene el código fuente de la aplicación.
    *   **`components/`**: Componentes de React reutilizables.
    *   **`data/`**: Archivos de datos estáticos (como el JSON de noticias).
    *   **`pages/`**: Componentes que representan las páginas de la aplicación.
    *   **`App.tsx`**: El componente principal de la aplicación que gestiona las rutas.
    *   **`index.tsx`**: El punto de entrada de la aplicación.
*   **`package.json`**: Define los scripts y las dependencias del proyecto.