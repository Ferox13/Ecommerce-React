import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "../components/ProductCard/ProductCard";
import ContactSection from "../components/Contact/ContactSection";
import { Product } from "../types";
import Header from "../components/Header";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mockup de productos en memoria para pruebas
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Producto de Ejemplo",
        description: "Descripción breve del producto de ejemplo.",
        price: 29.99,
        image: "/public/react.svg",
      },
      {
        id: 2,
        name: "Segundo Producto",
        description: "Otra descripción breve.",
        price: 49.99,
        image: "/public/react.svg",
      }
    ];
    setProducts(mockProducts.slice(0, 10));

    // Si se desea utilizar fetch del API, comentar el bloque anterior y descomentar el siguiente:
    /*
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 10)))
      .catch((error) => console.error("Error fetching products:", error));
    */
  }, []);

  return (
    <>
      <Header/>
      <div className="container mt-4">
        <h1 className="text-center">Bienvenido a Nuestra Tienda</h1>
        <p className="text-center">
          Encuentra los mejores productos a precios increíbles.
        </p>
        <h2 className="mt-4 text-center">Productos Destacados</h2>
        <div className="row g-4 d-flex justify-content-center">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 " key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
