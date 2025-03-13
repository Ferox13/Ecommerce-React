/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  db 
} from "./firebaseConfig";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
} from "firebase/firestore";
import { Product } from "../types";
import { toast } from "react-toastify";

// Obtener productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por id
export const getProductById = async (id: string | number): Promise<Product | null> => {
  if (!id) {
    toast.error("ID del producto inválido.");
    return null;
  }

  try {
    const idStr = String(id); 
    const productRef = doc(db, "products", idStr);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      toast.error("Producto no encontrado en Firestore.");
      return null;
    }

    return { id: productSnap.id, ...productSnap.data() } as Product;
  } catch (error) {
    toast.error("Error al obtener producto:");
    return null;
  }
};

// Agregar producto
export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};

// Editar producto
export const updateProduct = async (id: string, updatedProduct: Partial<Omit<Product, "id">>): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};

// Eliminar producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};

// Buscar productos por título
export const searchProductsByTitle = async (searchTerm: string): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product);
    
    // Filtrar productos que incluyen el término de búsqueda en el título (insensible a mayúsculas/minúsculas)
    const filteredProducts = products.filter(product => 
      product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredProducts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    toast.error(`Error al buscar productos por título: ${errorMessage}`);
    return [];
  }
};

// Buscar productos por descripción
export const searchProductsByDescription = async (searchTerm: string): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product);
    
    const filteredProducts = products.filter(product => 
      product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredProducts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    toast.error(`Error al buscar productos por descripción: ${errorMessage}`);
    return [];
  }
};
