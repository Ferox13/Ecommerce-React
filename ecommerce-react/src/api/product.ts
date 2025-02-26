import { db } from "./firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
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
// Obtener producto por id
export const getProductById = async (id: number) => {
  if (!id) {
    console.error("⛔ ID del producto inválido.");
    return null;
  }

  try {
    console.log("🔎 Buscando producto con ID en Firestore:", id);
    const productRef = doc(db, "products", id.toString());
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.error("❌ Producto no encontrado en Firestore.");
      return null;
    }

    console.log("✅ Producto encontrado:", productSnap.data());
    return { id: productSnap.id, ...productSnap.data() };
  } catch (error) {
    console.error("⚠️ Error al obtener producto:", error);
    return null;
  }
};
