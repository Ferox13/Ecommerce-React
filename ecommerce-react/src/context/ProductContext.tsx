import React, { createContext, useEffect, useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { Product, ProductContextType } from "../types";

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode; 
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
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