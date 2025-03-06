import React from "react";
import { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import "./ProductCard.css";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  customButton?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, customButton }) => {
  // const { addProduct } = useCart();
  const { addProduct } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addProduct({ ...product, title: product.title, quantity: 1 });
      toast.success("Producto añadido al carrito");
    }
  };
  return (
    <div className="card customCard">
      {/* Imagen del producto */}
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.title}
        className="card-img-top"
        style={{ objectFit: "cover", height: "180px" }}
      />

      {/* Cuerpo de la tarjeta */}
      <div className="card-body d-flex flex-column p-2">
        <h6 className="card-title mb-1">{product.title}</h6>
        <p className="card-text mb-2">${product.price}</p>

        {/* Renderizado condicional del botón */}
        {customButton ? (
          customButton
        ) : (
          <button
            className="btn btn-success btn-sm mt-auto"
            onClick={() => handleAddToCart()}
          >
            Añadir al carro
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
