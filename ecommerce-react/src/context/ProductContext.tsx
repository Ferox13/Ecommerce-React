import { createContext, useEffect, useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Product, ProductContextType } from "../types";

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: String(doc.id),
        ...(doc.data() as Omit<Product, "id">),
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
  // Agregar un nuevo producto
  interface AddNewProductFunction {
    (newProduct: Omit<Product, "id">): Promise<void>;
  }

  const addNewProduct: AddNewProductFunction = async (newProduct: Omit<Product, "id">): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      const addedProduct: Product = { id: String(docRef.id), ...newProduct };

      setProducts([...products, addedProduct]); // Actualizar estado localmente
      toast.success("Producto agregado correctamente");
    } catch (error) {
      console.error("rror al agregar producto:", error);
      toast.error("Error al agregar producto");
    }
  };

  // Actualizar un producto existente
  const updateProduct = async (id: string, updatedData: Partial<Omit<Product, "id">>): Promise<void> => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedData);

      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
      // toast.success("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error al actualizar producto");
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
  
      setProducts(products.filter((p) => String(p.id) !== id));
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, addNewProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
