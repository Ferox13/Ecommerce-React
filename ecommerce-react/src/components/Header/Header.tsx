import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Header: React.FC = () => {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For demo purposes - toggle login status
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
          </ul>
          
          {/* Login/Logout icons */}
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={toggleLogin}>
                  <FiLogIn className="me-1" /> Iniciar sesión
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={toggleLogin}>
                  <FiLogOut className="me-1" /> Cerrar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
