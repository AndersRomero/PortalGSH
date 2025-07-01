import React, { useState } from 'react';

const Admin = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [autor, setAutor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaNoticia = {
      id: Date.now(), // Usamos un timestamp como ID único
      titulo,
      contenido,
      autor,
      fecha: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3001/api/noticias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaNoticia),
      });

      if (response.ok) {
        alert('Noticia añadida correctamente');
        setTitulo('');
        setContenido('');
        setAutor('');
      } else {
        alert('Error al añadir la noticia');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Añadir Nueva Noticia</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">Contenido</label>
          <textarea
            className="form-control"
            id="contenido"
            rows={5}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Añadir Noticia</button>
      </form>
    </div>
  );
};

export default Admin;
