import React, { useState } from 'react';

const Admin = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [autor, setAutor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const nuevaNoticia = {
      id: Date.now(),
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
        setMessage({ type: 'success', text: '¡Noticia añadida correctamente!' });
        setTitulo('');
        setContenido('');
        setAutor('');
      } else {
        setMessage({ type: 'error', text: 'Error al añadir la noticia. Inténtalo de nuevo.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Error de conexión con el servidor.' });
    } finally {
      setIsLoading(false);
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
        
        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Enviando...</span>
            </>
          ) : (
            'Añadir Noticia'
          )}
        </button>
      </form>
    </div>
  );
};

export default Admin;
