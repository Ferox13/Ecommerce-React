import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/product";
import { toast } from "react-toastify";
import { Product } from "../types";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      console.error("⛔ ID del producto no válido.");
      toast.error("ID del producto no válido.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`🔍 Buscando producto con ID: ${id}`);
        const fetchedProduct = await getProductById(Number(id));
        if (!fetchedProduct) throw new Error("Producto no encontrado");
        setProduct(fetchedProduct as unknown as Product);
      } catch (error) {
        if (error instanceof Error) {
          console.error("❌ Error obteniendo producto:", error);
          toast.error(error.message);
        } else {
          console.error("❌ Error obteniendo producto:", error);
          toast.error("Error obteniendo producto");
        }
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="text-center mt-4">
        <p>Cargando producto...</p>
      </div>
    );
  if (!product)
    return (
      <div className="text-center text-danger mt-4">
        <p>Producto no encontrado</p>
      </div>
    );

  return (
    <div className="container p-4">
      <div className="card mb-4">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.title}
          className="card-img-top img-fluid"
        />
        <div className="card-body">
          <h1 className="card-title h3">{product.title}</h1>
          <p className="card-text">
            <strong>${product.price}</strong>
          </p>
          <p className="card-text">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;