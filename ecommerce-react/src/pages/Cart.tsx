import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleQuantityChange = (
    productId: string,
    newQuantity: number
  ): void => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeProduct(productId);
      toast.info("Producto eliminado");
    }
  };

  const handleRemove = (productId: string): void => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };
  
  const confirmRemoveProduct = (): void => {
    if (!productToDelete) return;
    
    removeProduct(productToDelete);
    toast.success("Producto eliminado del carrito");
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const total = cart.reduce<number>(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className="container py-4"
      style={{  color: "#E0E0E0", minHeight: "100vh" }}
    >
      <h1
        className="py-4 text-center fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
          textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Carrito
      </h1>{" "}
      {cart.length === 0 ? (
        <div className="alert alert-secondary">Tu carrito está vacío</div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white p-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className=" text-white">
                      {item.price}€ x {item.quantity}
                    </small>
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
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Resumen</h5>
              <p className="card-text fw-bold">Total: {total.toFixed(2)}€</p>
              <button className="btn btn-secondary w-100">
                Proceder al pago
              </button>
            </div>
          </div>
        </>
      )}
      
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        contentClassName="bg-dark text-light"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar este producto del carrito?</Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-light" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmRemoveProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
