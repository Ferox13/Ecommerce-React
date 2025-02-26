import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;