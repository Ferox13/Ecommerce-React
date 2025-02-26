import React from "react";
import "./loader.css";

const Loader: React.FC = () => (
  <div className="loader-container d-flex flex-column justify-content-center align-items-center mt-4">
    <img src="/bouncing-ball.svg" alt="Cargando..." className="loader-img" />
    <p className="mt-3">Cargando productos...</p>
  </div>
);

export default Loader;