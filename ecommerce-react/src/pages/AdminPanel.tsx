import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/product";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const prods = await getProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProducts(prods.map((product: any) => ({
        id: product.id,
        title: product.title || "Default Title",
        price: product.price || 0,
        image: product.image || "",
        description: product.description || ""
      })));
    } catch (error) {
      toast.error("Error al cargar productos");
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        await deleteProduct(id);
        toast.success("Producto eliminado correctamente");
        // Actualizar la lista de productos
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        toast.error("Error al eliminar el producto");
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  const handleEditProduct = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="mb-4 text-center">Administración de Productos</h1>
      <div className="row justify-content-center align-items-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4 mb-4 d-flex justify-content-center align-items-center flex-wrap">
            <ProductCard
              product={product}
              customButton={
                <div className="d-flex flex-column gap-2 w-100">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Ver detalles
                  </button>
                  <div className="d-flex justify-content-between gap-2">
                    <button
                      className="btn btn-warning flex-grow-1"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger flex-grow-1"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;