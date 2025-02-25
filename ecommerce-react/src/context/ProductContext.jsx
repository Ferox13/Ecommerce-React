import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, getDocs} from "firebase/firestore";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchProducts(); // Cargar productos al iniciar la app
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);