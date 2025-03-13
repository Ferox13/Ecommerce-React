/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { getProducts, deleteProduct } from "../api/product";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, Pencil, Trash2, Search, BookText, FileText, XCircle } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";

const AdminPanel: React.FC = () => {
  const { 
    products, 
    loading, 
    searchResults, 
    searchProductsByTitle, 
    searchProductsByDescription 
  } = useContext(ProductContext)!;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "description">("title");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    if (searchType === "title") {
      await searchProductsByTitle(searchTerm);
    } else {
      await searchProductsByDescription(searchTerm);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  // Determinar qué productos mostrar
  const displayedProducts = isSearching ? searchResults : products;

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete);
      toast.success("Producto eliminado correctamente");
      // No need to manually update products as it will be handled by context
    } catch (error) {
      toast.error("Error al eliminar el producto");
    } finally {
      // Close the modal
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleEditProduct = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
        }}
      >
        Administración de Productos
      </h1>
        {/* Formulario de búsqueda */}
        <div className="search-container mb-4 p-3 rounded d-flex justify-content-center align-items-center w-100 row">
        <form onSubmit={handleSearch} className="row g-3 align-items-center">
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <div className="input-group" style={{ width: "auto" }}>
              <input
                type="text"
                className="form-control bg-dark text-light border-dark"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  caretColor: "#6c757d", 
                  width: "200px" 
                }}
              />
              <button 
                className="btn btn-outline-light d-flex align-items-center gap-1" 
                type="submit"
                disabled={!searchTerm.trim()}
              >
                <Search size={18} /> <span className="d-none d-md-inline">Buscar</span>
              </button>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="d-flex gap-2">
              <button 
                type="button"
                className={`btn ${searchType === 'title' ? 'btn-light' : 'btn-dark border-secondary'} d-flex align-items-center gap-2`}
                onClick={() => setSearchType("title")}
                style={{ transition: "all 0.3s ease" }}
              >
                <BookText size={18} /> <span>Por título</span>
              </button>
              
              <button 
                type="button"
                className={`btn ${searchType === 'description' ? 'btn-light' : 'btn-dark border-secondary'} d-flex align-items-center gap-2`}
                onClick={() => setSearchType("description")}
                style={{ transition: "all 0.3s ease" }}
              >
                <FileText size={18} /> <span>Por descripción</span>
              </button>
            </div>
          </div>
          
          {isSearching && (
            <div className="col-12 col-md-2">
              <button 
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" 
                type="button"
                onClick={resetSearch}
                style={{ transition: "all 0.3s ease" }}
              >
                <XCircle size={18} /> <span>Limpiar</span>
              </button>
            </div>
          )}
        </form>
      </div>
      
      {isSearching && (
        <div className="alert bg-dark text-light border-secondary d-flex align-items-center">
          <Search size={18} className="me-2" />
          <span>
            Mostrando {searchResults.length} resultados para "<strong>{searchTerm}</strong>" en {searchType === "title" ? "títulos" : "descripciones"}
          </span>
        </div>
      )}
      <div className="row justify-content-center align-items-center">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="col-12 col-md-4 mb-4 d-flex justify-content-center align-items-center flex-wrap"
          >
            <ProductCard
              product={product}
              customButton={
                <div className="d-flex flex-column gap-2 w-100">
                  <button
                    className="btn btn-outline-secondary border-0 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate(`/product/${product.id}`)}
                    aria-label="Ver detalles"
                  >
                    <Eye size={18} /> <span className="small">Detalles</span>
                  </button>
                  <div className="d-flex justify-center gap-3 mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary border-0 text-warning"
                      onClick={() => handleEditProduct(product.id)}
                      aria-label="Editar producto"
                    >
                      <Pencil size={18} /> <span className="small">Editar</span>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary border-0 text-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />{" "}
                      <span className="small">Eliminar</span>
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal with Dark Theme */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        contentClassName="bg-dark text-light"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar este producto?</Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-light" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
