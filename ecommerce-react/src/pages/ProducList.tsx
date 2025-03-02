import React, { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const prods = await getProducts();
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
      <h1 className="mb-4 text-center">Todos los Productos</h1>
      <div className="row justify-content-center align-items-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4 mb-4 d-flex justify-content-center align-items-center flex-wrap">
            <ProductCard
              product={product}
              customButton={
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Ver detalles
                </button>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;