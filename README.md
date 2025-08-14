# Portal de Noticias

## 1. Descripción General

Esta es una aplicación web para un portal de noticias. El frontend está construido con **React** y **TypeScript**, y utiliza **Bootstrap** para el diseño. La aplicación permite a los usuarios ver una lista de noticias y, a través de una ruta de administración, permite añadir nuevas noticias sin necesidad de modificar manualmente los archivos de datos.

## 2. Características

*   **Visualización de Noticias:** Muestra una lista de noticias con título, contenido, autor y fecha.
*   **Administración de Noticias:** Permite a los administradores añadir nuevas noticias a través de un formulario.
*   **Persistencia de Datos:** Las noticias se guardan en un archivo JSON, actuando como una base de datos simple.
*   **Servidor Dedicado:** Un servidor Express maneja la lógica de negocio para añadir noticias.

## 3. Tecnologías Utilizadas

*   **Frontend:**
    *   **React:** Biblioteca para construir interfaces de usuario.
    *   **TypeScript:** Superset de JavaScript que añade tipado estático.
    *   **Bootstrap:** Framework de CSS para el diseño de la interfaz.
    *   **React Router:** Para la gestión de rutas en la aplicación.
*   **Backend:**
    *   **Node.js:** Entorno de ejecución para JavaScript en el servidor.
    *   **Express:** Framework para construir APIs web.
    *   **CORS:** Para permitir peticiones desde el frontend al backend.
*   **Herramientas de Desarrollo:**
    *   **Concurrently:** Para ejecutar múltiples comandos simultáneamente (frontend y backend).
    *   **React Scripts:** Scripts y configuración para aplicaciones Create React App.

## 4. Arquitectura y Flujo de Datos

El proyecto utiliza una arquitectura cliente-servidor desacoplada para el desarrollo local:

*   **Cliente (Frontend):** Una aplicación de **Create React App** que se ejecuta en `http://localhost:3000`. Se encarga de renderizar la interfaz de usuario.
*   **Servidor (Backend):** Un servidor simple de **Node.js/Express** que se ejecuta en `http://localhost:3001`. Su única responsabilidad es recibir datos de nuevas noticias y actualizar el archivo de persistencia.

Ambos servidores se inician simultáneamente gracias al script `start` que utiliza la librería `concurrently`.

### Flujo para Añadir una Noticia

1.  **Usuario:** Navega a la página `/admin`.
2.  **Frontend:** Renderiza el componente `Admin.tsx`, que muestra un formulario para el título, contenido y autor de la noticia.
3.  **Usuario:** Rellena el formulario y hace clic en "Añadir Noticia".
4.  **Frontend:** Se activa el evento `handleSubmit`. Se construye un objeto de noticia y se envía una petición `POST` a `http://localhost:3001/api/noticias` con la nueva noticia en el cuerpo (body) de la petición.
5.  **Backend:** El servidor Express recibe la petición en el endpoint `/api/noticias`.
6.  **Backend:** Lee el contenido actual de `src/data/noticias.json`.
7.  **Backend:** Añade la nueva noticia al array de noticias existente.
8.  **Backend:** Sobrescribe `src/data/noticias.json` con el array actualizado.
9.  **Backend:** Devuelve una respuesta de éxito (`200 OK`) al frontend.
10. **Frontend:** Al recibir la respuesta de éxito, muestra una alerta al usuario y limpia los campos del formulario.

## 5. Estructura del Proyecto

A continuación se describen los archivos y directorios más importantes:

*   **`server.js`**: El servidor backend de Express. Gestiona la API para añadir noticias.
*   **`package.json`**: Define las dependencias y los scripts del proyecto. El script `start` es clave para ejecutar ambos, el cliente y el servidor.
*   **`src/`**: Contiene todo el código fuente del frontend.
    *   **`data/noticias.json`**: Actúa como la "base de datos" del proyecto. Es un archivo JSON que almacena un array de objetos, donde cada objeto es una noticia.
    *   **`components/`**: Contiene componentes de React reutilizables (ej. `Header.tsx`, `Footer.tsx`).
    *   **`pages/`**: Contiene los componentes que representan una página completa.
        *   **`HomePage.tsx`**: La página principal que muestra la lista de noticias.
        *   **`Admin.tsx`**: La página de administración que contiene el formulario para añadir nuevas noticias.
    *   **`App.tsx`**: El componente raíz de la aplicación. Define las rutas principales (`/`, `/admin`) utilizando `react-router-dom`.
    *   **`index.tsx`**: El punto de entrada de la aplicación React.

## 6. API Endpoints

### Añadir Noticia

*   **URL:** `/api/noticias`
*   **Método:** `POST`
*   **Cuerpo (Body):**
    ```json
    {
      "id": 17200345,
      "titulo": "Título de la Noticia",
      "contenido": "Contenido completo de la noticia.",
      "autor": "Nombre del Autor",
      "fecha": "2025-07-04T12:00:00.000Z"
    }
    ```
*   **Respuesta Exitosa:**
    *   **Código:** `200 OK`
    *   **Contenido:** `{ "message": "Noticia añadida correctamente" }`
*   **Respuesta de Error:**
    *   **Código:** `500 Internal Server Error`
    *   **Contenido:** `Error interno del servidor`

## 7. Cómo Empezar

Para poner en marcha el proyecto, sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar los servidores (Frontend y Backend):**
    ```bash
    npm start
    ```
La aplicación estará disponible en `http://localhost:3000` y la página de administración en `http://localhost:3000/admin`.

## 8. Despliegue

Para crear una versión de producción de la aplicación, puedes utilizar el siguiente comando:

```bash
npm run build
```

Esto generará una carpeta `build` con los archivos estáticos de la aplicación, listos para ser desplegados en un servidor web.