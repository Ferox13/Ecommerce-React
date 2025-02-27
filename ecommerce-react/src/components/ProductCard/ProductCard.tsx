import React from "react";
import { Product } from "../../types";
import "./ProductCard.css";
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const { addProduct } = useCart();

  return (
    <div className="card customCard" >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.title}
        className="card-img-top"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column p-2">
        <h6 className="card-title mb-1" style={{ fontSize: "1rem" }}>
          {product.title}
        </h6>
        <p className="card-text mb-2" style={{ fontSize: "0.9rem" }}>
          ${product.price}
        </p>
        <button
          className="btn btn-success btn-sm mt-auto"
          // onClick={() => addProduct(product)}
        >
          Añadir al carro
        </button>
      </div>
    </div>
  );
};

export default ProductCard;