/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/product";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Modal, Button } from "react-bootstrap"; // Add this import

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Add this state
  const [productToDelete, setProductToDelete] = useState<string | null>(null); // Add this state
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const prods = await getProducts();
      setProducts(
        prods.map((product: any) => ({
          id: product.id,
          title: product.title || "Default Title",
          price: product.price || 0,
          image: product.image || "",
          description: product.description || "",
        }))
      );
    } catch (error) {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete);
      toast.success("Producto eliminado correctamente");
      // Actualizar la lista de productos
      setProducts(products.filter((product) => product.id !== productToDelete));
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
      </h1>{" "}
      <div className="row justify-content-center align-items-center">
        {products.map((product) => (
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
