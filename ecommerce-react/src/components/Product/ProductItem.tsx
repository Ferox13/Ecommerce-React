import { Link } from "react-router-dom";
import { Product } from "../../types";

const ProductCard = ({ product }: { product: Product }) => {
  console.log("🔗 Producto en ProductCard:", product);

  return (
    <div className="card h-100">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">${product.price}</p>
        {product.id ? (
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary mt-auto"
          >
            Ver detalles
          </Link>
        ) : (
          <p className="text-danger">ID no disponible</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
