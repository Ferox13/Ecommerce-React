import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/product";
import { toast } from "react-toastify";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

const ProductDetail: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      toast.error("ID del producto no válido.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        if (!fetchedProduct) throw new Error("Producto no encontrado");
        setProduct(fetchedProduct);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
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
    <div className="container-fluid py-4 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="product-detail-wrapper" style={{ maxWidth: "1000px", width: "100%" }}>
        <div className="enlarged-product-card" style={{ 
          transform: "scale(1.2)",
          transformOrigin: "center center",
          margin: "2rem auto"
        }}>
          <ProductCard product={product} showDescription={true} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;