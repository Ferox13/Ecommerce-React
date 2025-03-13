import React, { useEffect, useState, useContext } from "react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Eye, Search, BookText, FileText, XCircle } from "lucide-react"; 
import { ProductContext } from "../context/ProductContext";

const ProductList: React.FC = () => {
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

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
        }}
      >
        Todos los productos
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
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-md-6 col-lg-6 mb-5 d-flex justify-content-center align-items-center"
              style={{ maxWidth: "500px" }}
            >
              <div className="w-100 product-card-wrapper">
                <ProductCard
                  product={product}
                  customButton={
                    <button
                      className="btn btn-outline-secondary border-0 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => navigate(`/product/${product.id}`)}
                      aria-label="Ver detalles"
                      style={{
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e91e63")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "")
                      }
                    >
                      <Eye size={18} /> <span className="small">Detalles</span>
                    </button>
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-white">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
