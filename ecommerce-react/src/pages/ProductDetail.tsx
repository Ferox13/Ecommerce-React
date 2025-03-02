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
      console.error("⛔ ID del producto no válido.");
      toast.error("ID del producto no válido.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`🔍 Buscando producto con ID: ${id}`);
        // Usar el ID directamente como string, sin convertir a número
        const fetchedProduct = await getProductById(id);
        if (!fetchedProduct) throw new Error("Producto no encontrado");
        setProduct(fetchedProduct);
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
    <div className="container-fluid p-4 d-flex justify-content-center align-items-center">
      <ProductCard product={product} />
    </div>
  );
};

export default ProductDetail;