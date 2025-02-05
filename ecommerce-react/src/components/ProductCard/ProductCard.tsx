import { Link } from "react-router-dom";
import { Product } from "../../types";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ product }: { product: Product }) => (
  <div className="col-md-4 col-lg-2 mb-4 d-flex justify-content-center w-100">
    <Link
      to={`/product/${product.id}`}
      className="card text-decoration-none text-dark d-flex flex-column"
      style={{ width: "250px", height: "250px" }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ objectFit: "cover", height: "150px" }}
      />
      <div className="card-body p-2 d-flex flex-column justify-content-center">
        <h5 className="card-title mb-2">{product.name}</h5>
        <p className="card-text m-0">{product.price}€</p>
      </div>
    </Link>
  </div>
);

export default ProductCard;