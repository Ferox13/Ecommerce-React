import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types";

// Obtener productos
export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products: Product[] = querySnapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
  })) as unknown as Product[];
  return products;
};
