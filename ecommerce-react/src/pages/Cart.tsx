import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleQuantityChange = (productId: string, newQuantity: number): void => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeProduct(productId);
      toast.info("Producto eliminado");
    }
  };

  const handleRemove = (productId: string): void => {
    if (window.confirm("¿Seguro que quieres eliminar este producto del carrito?")) {
      removeProduct(productId);
      toast.success("Producto eliminado del carrito");
    }
  };

  const total = cart.reduce<number>((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío</div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "5px"
                    }}
                  />
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className="text-muted">${item.price} x {item.quantity}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="form-control mx-2"
                    style={{ width: "70px" }}
                    min="1"
                  />
                  <button 
                    onClick={() => handleRemove(item.id)} 
                    className="btn btn-danger btn-sm"
                    aria-label="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen</h5>
              <p className="card-text fw-bold">Total: ${total.toFixed(2)}</p>
              <button className="btn btn-primary w-100">Proceder al pago</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;