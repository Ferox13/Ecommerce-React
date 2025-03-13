import React from 'react';
import { useCart } from "../../hooks/useCart";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string; 
    [key: string]: unknown; 
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeProduct } = useCart();


  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`http://localhost:5000${item.image}`}
            className="img-fluid rounded-start"
            alt={item.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">Precio: ${item.price}</p>
            <div className="d-flex align-items-center">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="form-control me-2"
                style={{ width: "80px" }}
              />
              <button
                onClick={() => removeProduct(item.id)}
                className="btn btn-danger btn-sm"
              >
                &times; Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;