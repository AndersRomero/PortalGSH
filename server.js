const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos SQLite
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    // Crear la tabla de noticias si no existe
    db.run(`
      CREATE TABLE IF NOT EXISTS noticias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        contenido TEXT NOT NULL,
        autor TEXT NOT NULL,
        fecha TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla de noticias:', err.message);
      } else {
        console.log('Tabla de noticias creada o ya existe.');
      }
    });
  }
});

// Endpoint para añadir una nueva noticia
app.post('/api/noticias', (req, res) => {
  const { titulo, contenido, autor, fecha } = req.body;

  if (!titulo || !contenido || !autor || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const sql = `INSERT INTO noticias (titulo, contenido, autor, fecha) VALUES (?, ?, ?, ?)`;
  db.run(sql, [titulo, contenido, autor, fecha], function(err) {
    if (err) {
      console.error('Error al insertar noticia:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor al guardar la noticia.' });
    }
    res.status(201).json({ message: 'Noticia añadida correctamente', id: this.lastID });
  });
});

// Endpoint para obtener todas las noticias
app.get('/api/noticias', (req, res) => {
  db.all("SELECT * FROM noticias ORDER BY fecha DESC", [], (err, rows) => {
    if (err) {
      console.error('Error al obtener noticias:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor al obtener las noticias.' });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});