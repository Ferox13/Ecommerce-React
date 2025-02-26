import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { Product, ProductContextType } from "../types";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener productos con retardo para ver el spinner
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      // Simulación de retraso de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      const productList = querySnapshot.docs.map(doc => ({
        id: Number(doc.id),
        ...(doc.data() as Omit<Product, "id">)
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error fetching products: ${error.message}`);
      } else {
        toast.error("Error fetching products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
