const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const noticiasFilePath = path.join(__dirname, 'src', 'data', 'noticias.json');

app.post('/api/noticias', (req, res) => {
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
