import React from "react";
import { useProductsHome } from "../hooks/useProductsHome";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import Loader from "../components/Loader";

const HomePage: React.FC = () => {
  const { products, loading } = useProductsHome();

  const featuredProducts: Product[] = products;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container p-4">
      <h1 className="display-4 fw-bold">Bienvenido a nuestra Tienda</h1>
      <button className="btn btn-primary">Ver todos los productos</button>
      <p className="text-secondary mt-2">
        Encuentra los mejores productos al mejor precio.
      </p>

      <h2 className="h4 fw-bold mt-4">Productos Destacados</h2>
      <div className="row mt-4">
        {featuredProducts.length > 0
          ? featuredProducts.map((product: Product) => (
              <div key={product.id} className="col-6 col-md-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HomePage;
