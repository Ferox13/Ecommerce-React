import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./header.css";
import {
  Home,
  Box,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  Plus,
  ShoppingCart,
  Disc,
} from "lucide-react";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Verificar si el usuario es administrador
  const isAdmin = user && user.email === "admin@admin.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark w-100 text-light">
      <div className="container-fluid">
      <Disc size={20} />
      <span className="text-xl font-bold text-white">VinylVault</span>
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
                <Home className="me-1" /> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <Box className="me-1" /> Productos
              </Link>
            </li>
            {/* Panel de Administrador - Solo visible para el admin */}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <Settings className="me-1" /> Administración
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    <Plus className="me-1" /> Crear Producto
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
                    <LogIn className="me-1" /> Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <UserPlus className="me-1" /> Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <ShoppingCart className="me-1" /> Carrito
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    <LogOut className="me-1" /> Cerrar sesión
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
