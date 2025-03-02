import React from 'react';
import { useCart } from "../../context/CartContext";

// Define item type
interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    [key: string]: any; // For any additional properties
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeProduct } = useCart();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center border-bottom py-2">
      <span>{item.title} - ${item.price}</span>
      <input
        type="number"
        value={item.quantity}
        min="1"
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        className="form-control mx-2"
        style={{ width: "80px" }}
      />
      <button
        onClick={() => removeProduct(item.id)}
        className="btn btn-sm btn-danger"
        aria-label="Remove item"
      >
        <span>&times;</span>
      </button>
    </li>
  );
};

export default CartItem;