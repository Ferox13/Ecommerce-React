import React, { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react"; // Import the Eye icon from Lucide

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const prods = await getProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProducts(prods.map((product: any) => ({
        id: product.id,
        title: product.title || "Default Title",
        price: product.price || 0,
        image: product.image || "",
        description: product.description || ""
      })));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="mb-4 text-center text-white">Todos los Productos</h1>
      <div className="row justify-content-center align-items-center">
        {products.map((product) => (
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
                  >
                    <Eye size={18} /> <span className="small">Detalles</span>
                  </button>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;