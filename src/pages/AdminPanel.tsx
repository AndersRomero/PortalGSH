import React, { useState, useEffect, useMemo } from 'react';
import { Noticia } from '../types';
import { Container, Row, Col, Button, Form, Modal, Table, Alert, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NEWS_PER_PAGE = 10;

const AdminPanel: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNoticia, setCurrentNoticia] = useState<Noticia | null>(null);
  const [formData, setFormData] = useState<Omit<Noticia, 'id' | 'fecha'>>({
    titulo: '',
    contenido: '',
    autor: '',
    imagen: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const API_URL = 'http://localhost:3001/api/noticias';

  const fetchNoticias = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Noticia[] = await response.json();
      setNoticias(data);
    } catch (err: any) {
      setError(`Error al cargar noticias: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const filteredNoticias = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return noticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(searchLower) ||
      noticia.contenido.toLowerCase().includes(searchLower) ||
      noticia.autor.toLowerCase().includes(searchLower) ||
      new Date(noticia.fecha).toLocaleDateString().toLowerCase().includes(searchLower)
    );
  }, [noticias, searchTerm]);

  const totalPages = Math.ceil(filteredNoticias.length / NEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const currentNoticias = filteredNoticias.slice(startIndex, startIndex + NEWS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleShowModal = (noticia?: Noticia) => {
    setCurrentNoticia(noticia || null);
    if (noticia) {
      setFormData({
        titulo: noticia.titulo,
        contenido: noticia.contenido,
        autor: noticia.autor,
        imagen: noticia.imagen || '',
      });
      setImagePreview(noticia.imagen || null);
    } else {
      setFormData({
        titulo: '',
        contenido: '',
        autor: '',
        imagen: '',
      });
      setImagePreview(null);
    }
    setSelectedFile(null);
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNoticia(null);
    setFormData({
      titulo: '',
      contenido: '',
      autor: '',
      imagen: '',
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let imageUrl = formData.imagen;
    const token = localStorage.getItem('adminToken');

    try {
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', selectedFile);

        const uploadResponse = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: uploadFormData,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!uploadResponse.ok) {
          if (uploadResponse.status === 401 || uploadResponse.status === 403) {
            navigate('/login');
            return;
          }
          throw new Error(`Error al subir la imagen: ${uploadResponse.statusText}`);
        }
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.imageUrl;
      }

      let response;
      const noticiaData = { ...formData, imagen: imageUrl };

      if (currentNoticia) {
        // Update existing noticia
        response = await fetch(`${API_URL}/${currentNoticia.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(noticiaData),
        });
      } else {
        // Add new noticia
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ ...noticiaData, id: Date.now(), fecha: new Date().toISOString() }),
        });
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(result.message || 'Operación exitosa!');
      fetchNoticias(); // Refresh the list
      handleCloseModal();
    } catch (err: any) {
      setError(`Error al guardar noticia: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      return;
    }
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(result.message || 'Noticia eliminada correctamente!');
      fetchNoticias(); // Refresh the list
    } catch (err: any) {
      setError(`Error al eliminar noticia: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Panel de Administración de Noticias</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Añadir Nueva Noticia
        </Button>
        <Form.Group className="mb-0" style={{ width: '300px' }}>
          <Form.Control
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>

      <Table striped bordered hover responsive className="align-middle shadow-sm">
        <thead >
          <tr className="text-center" > 
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>ID</th>
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>Título</th>
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>Autor</th>
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>Fecha</th>
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>Imagen</th>
            <th style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentNoticias.length > 0 ? (
            currentNoticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.id}</td>
                <td>{noticia.titulo}</td>
                <td>{noticia.autor}</td>
                <td>{new Date(noticia.fecha).toLocaleDateString()}</td>
                <td>
                  {noticia.imagen ? (
                    <img src={noticia.imagen} alt="Noticia" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="text-center">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(noticia)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(noticia.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">No hay noticias para mostrar.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            {Array.from({ length: totalPages }, (_, number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#0a2e4a', textAlign: 'center' }}>{currentNoticia ? 'Editar Noticia' : 'Añadir Noticia'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#0a2e4a' }}>Título de la Noticia</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ingrese el título de la noticia"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#0a2e4a' }}>Contenido de la Noticia</Form.Label>
              <Form.Control
                as="textarea"
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                rows={5}
                placeholder="Escriba el contenido completo de la noticia"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#0a2e4a' }}>Autor de la Noticia</Form.Label>
              <Form.Control
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                placeholder="Ingrese el nombre del autor"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#0a2e4a' }}>Subir Imagen (Opcional)</Form.Label>
              <Form.Control
                type="file"
                name="imagenFile"
                onChange={handleFileChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Previsualización" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                </div>
              )}
              {currentNoticia && currentNoticia.imagen && !selectedFile && (
                <div className="mt-2">
                  <small className="text-muted">Imagen actual:</small>
                  <img src={currentNoticia.imagen} alt="Actual" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentNoticia ? 'Guardar Cambios' : 'Añadir Noticia'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
