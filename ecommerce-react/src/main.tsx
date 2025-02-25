import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.js";
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById("root")!).render(
      <ProductProvider>
        <App />
      </ProductProvider>
);