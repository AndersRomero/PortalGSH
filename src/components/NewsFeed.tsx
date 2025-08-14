
<<<<<<< HEAD
import React, { useState, useMemo, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> ad405173ca5114d964888692cc8258b79b38ab0a
import NewsCard from './NewsCard';
import { Noticia } from '../types';
import { motion } from 'framer-motion';
import { Pagination, Form, Modal, Button } from 'react-bootstrap';

const NEWS_PER_PAGE = 6;

const NewsFeed: React.FC = () => {
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);

  const API_URL = 'http://localhost:3001/api/noticias';

  const fetchNoticias = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Noticia[] = await response.json();
      setNoticias(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const filteredNoticias = useMemo(() => {
    return noticias.filter(noticia => {
      const searchLower = searchTerm.toLowerCase();
      const dateString = new Date(noticia.fecha).toLocaleDateString();
      return (
        noticia.titulo.toLowerCase().includes(searchLower) ||
        noticia.contenido.toLowerCase().includes(searchLower) ||
        noticia.autor.toLowerCase().includes(searchLower) ||
        dateString.includes(searchLower)
      );
    });
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

  const handleShowDetailModal = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedNoticia(null);
  };
=======
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/noticias');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Noticia[] = await response.json();
        setNoticias(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("No se pudieron cargar las noticias.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Cargando noticias...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5 text-center">{error}</div>;
  }

  if (noticias.length === 0) {
    return <div className="text-center mt-5">No hay noticias disponibles.</div>;
  }
>>>>>>> ad405173ca5114d964888692cc8258b79b38ab0a

  return (
    <div className="container mt-4">
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar noticias por título, contenido, autor o fecha..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-pill shadow-sm"
          style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
        />
      </Form.Group>
      <div className="row">
        {currentNoticias.map((noticia, index) => (
          <motion.div 
            className="col-md-4 mb-4"
            key={noticia.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NewsCard 
              noticia={noticia}
              onClick={handleShowDetailModal}
            />
          </motion.div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: totalPages }, (_, number) => (
            <Pagination.Item 
              key={number + 1} 
              active={number + 1 === currentPage} 
              onClick={(e) => { 
                e.preventDefault(); 
                handlePageChange(number + 1); 
              }}
              href="#"
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#0a2e4a', color: '#FFFFFF', borderBottom: 'none' }}>
          <Modal.Title style={{ color: '#FFFFFF' }}>{selectedNoticia?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f5f5f5', color: '#000' }}>
          {selectedNoticia?.imagen && (
            <img src={selectedNoticia.imagen} alt={selectedNoticia.titulo} className="img-fluid mb-3 rounded shadow-sm" style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }} />
          )}
          <p style={{ color: '#000' }}>{selectedNoticia?.contenido}</p>
          <p className="text-muted" style={{ color: '#47494b !important' }}>
            <small>Por: {selectedNoticia?.autor} - {selectedNoticia?.fecha ? new Date(selectedNoticia.fecha).toLocaleDateString() : ''}</small>
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f5f5f5', borderTop: 'none' }}>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewsFeed;
