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
  <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
          textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Todos los productos
      </h1>{" "}      <div className="row justify-content-center align-items-center">
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
                    style={{
                      borderRadius: "4px",
                      transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e91e63"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = ""}
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