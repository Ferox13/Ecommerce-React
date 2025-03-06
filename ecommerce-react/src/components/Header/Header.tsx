import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut, FiUserPlus, FiSettings, FiPlus, FiShoppingCart } from "react-icons/fi";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Verificar si el usuario es administrador
  const isAdmin = user && user.email === "admin@admin.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
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
            {/* Panel de Administrador - Solo visible para el admin */}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <FiSettings className="me-1" /> Administración
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    <FiPlus className="me-1" /> Crear Producto
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Login/Logout, register and Cart */}
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FiLogIn className="me-1" /> Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FiUserPlus className="me-1" /> Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FiShoppingCart className="me-1" /> Carrito
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    <FiLogOut className="me-1" /> Cerrar sesión
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;