import React from "react";
import { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./ProductCard.css";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  customButton?: React.ReactNode;
  showDescription?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, customButton, showDescription }) => {
  const { addProduct } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para añadir productos al carrito");
      return;
    }
    addProduct({ ...product, title: product.title, quantity: 1 });
    toast.success("Producto añadido al carrito");
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
        <p className="card-text mb-2 greenColor">${product.price}</p>
        
        {/* Mostrar descripción solo si showDescription es true */}
        {showDescription && product.description && (
          <p className="card-text mb-2">{product.description}</p>
        )}

        {/* Renderizado condicional del botón */}
        {customButton ? (
          customButton
        ) : (
          <button
            className="btn btn-outline-light btn-sm mt-auto d-flex align-items-center justify-content-center gap-1"
            onClick={handleAddToCart}
            style={{
              
              borderRadius: "4px",
              padding: "6px 12px",
              backgroundColor: "transparent",
              color: "#fff",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e91e63";
              e.currentTarget.style.color = "#fff";

            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#fff";

            }}
          >
            <ShoppingCart size={16} />
            <span>Añadir</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
