import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../pages/ProducList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../context/AuthContext";
import AdminPanel from "../pages/AdminPanel";

// Define types for route components

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Espera hasta que Firebase verifique la autenticación

  return user ? <Navigate to="/" /> : <>{children}</>;
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user && user.email === "admin@admin.com" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            {/* Rutas privadas (requieren autenticación) */}

            {/* Ruta de administrador (solo para el admin) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
