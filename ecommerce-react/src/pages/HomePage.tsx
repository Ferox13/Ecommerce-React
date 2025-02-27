import React from "react";
import { Link } from "react-router-dom";
import { useProductsHome } from "../hooks/useProductsHome";
import { Product } from "../types";
import Loader from "../components/Loader";
import { Carousel } from "react-responsive-3d-carousel";
import "react-responsive-3d-carousel/dist/styles.css";

const HomePage: React.FC = () => {
  const { products, loading } = useProductsHome();

  // Creamos el array de imágenes del carrusel utilizando un número incrementado para cada imagen
  const images = products.map((product: Product, index: number) => (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Link>
  ));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Carousel
          items={images}
          startIndex={0}
          onChange={(currentIndex: unknown) => console.log(currentIndex)}
          showIndicators={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
