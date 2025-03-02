import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from "./context/ProductContext.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from './context/CartContext.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);