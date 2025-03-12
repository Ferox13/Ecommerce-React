import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// Define interfaces for type safety
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  [key: string]: unknown; 
}

interface OrderData {
  userId: string;
  items: CartItem[];
  createdAt: Date;
  [key: string]: unknown; 
}

interface Order extends OrderData {
  id: string;
}

// Crear una pedido
export const createOrder = async (userId: string, cartItems: CartItem[]): Promise<string> => {
    try {
        const orderData: OrderData = {
            userId,
            items: cartItems,
            createdAt: new Date(),
        };
        const docRef = await addDoc(collection(db, "orders"), orderData);
        return docRef.id;
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
};

// Obtener todas los pedidos del usuario
export const getUserOrders = async (userId: string): Promise<Order[]> => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs
        .filter((doc) => doc.data().userId === userId)
        .map((doc) => ({ id: doc.id, ...doc.data() } as Order));
};

// Obtener detalles de una orden
export const getOrderById = async (orderId: string): Promise<Order> => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() } as Order;
    } else {
        throw new Error("Pedido no encontrada");
    }
};