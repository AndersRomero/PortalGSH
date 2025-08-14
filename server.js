const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const noticiasFilePath = path.join(__dirname, 'src', 'data', 'noticias.json');
console.log('Ruta de noticias:', noticiasFilePath);

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    // Crear la carpeta si no existe
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Endpoint para subir imágenes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  // Devolver la URL pública de la imagen
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.get('/api/noticias', (req, res) => {
  fs.readFile(noticiasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error interno del servidor');
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  // Devolver la URL pública de la imagen
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Endpoint de login (ejemplo simple)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Credenciales hardcodeadas para el ejemplo
  if (username === 'admin' && password === 'password') {
    // En un caso real, aquí se generaría un JWT o una sesión
    res.status(200).json({ message: 'Login exitoso', token: 'fake-admin-token' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // Si no hay token

  // En un caso real, aquí se verificaría el JWT
  if (token === 'fake-admin-token') {
    next(); // Token válido, continuar
  } else {
    res.sendStatus(403); // Token inválido
  }
};

// Aplicar el middleware a las rutas de noticias que requieren autenticación
app.post('/api/noticias', authenticateToken, (req, res) => {
  const nuevaNoticia = req.body;

  fs.readFile(noticiasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error interno del servidor');
    }

    const noticias = JSON.parse(data);
    noticias.push(nuevaNoticia);

    fs.writeFile(noticiasFilePath, JSON.stringify(noticias, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error interno del servidor');
      }

      res.status(200).send({ message: 'Noticia añadida correctamente' });
    });
  });
});

app.put('/api/noticias/:id', authenticateToken, (req, res) => {
  const noticiaId = parseInt(req.params.id);
  const updatedNoticia = req.body;

  fs.readFile(noticiasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error interno del servidor');
    }

    let noticias = JSON.parse(data);
    const index = noticias.findIndex(n => n.id === noticiaId);

    if (index !== -1) {
      noticias[index] = { ...noticias[index], ...updatedNoticia };
      fs.writeFile(noticiasFilePath, JSON.stringify(noticias, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).send('Error interno del servidor');
        }
        res.status(200).send({ message: 'Noticia actualizada correctamente' });
      });
    } else {
      res.status(404).send({ message: 'Noticia no encontrada' });
    }
  });
});

app.delete('/api/noticias/:id', authenticateToken, (req, res) => {
  const noticiaId = parseInt(req.params.id);

  fs.readFile(noticiasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error interno del servidor');
    }

    let noticias = JSON.parse(data);
    const initialLength = noticias.length;
    noticias = noticias.filter(n => n.id !== noticiaId);

    if (noticias.length < initialLength) {
      fs.writeFile(noticiasFilePath, JSON.stringify(noticias, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).send('Error interno del servidor');
        }
        res.status(200).send({ message: 'Noticia eliminada correctamente' });
      });
    } else {
      res.status(404).send({ message: 'Noticia no encontrada' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
