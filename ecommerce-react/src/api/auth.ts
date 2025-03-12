import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface AdditionalData {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

// Registro de usuario con correo y contraseña
export const registerUser = async (
  email: string,
  password: string,
  additionalData: AdditionalData
): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Perfil de usuario en Authen1tication de Firebase
  await updateProfile(user, { displayName: additionalData.username });

  await setDoc(doc(db, "users", user.uid), {
    username: additionalData.username,
    firstName: additionalData.firstName,
    lastName: additionalData.lastName,
    email: email,
    birthDate: additionalData.birthDate,
    createdAt: new Date(),
  });

  return user;
};

// Inicio de sesión con correo y contraseña
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Hubo un error al iniciar sesión", error);
    throw (error as Error).message;
  }
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    console.error("Hubo un error al cerrar la sesión", error);
    if (error instanceof Error) {
      throw error.message;
    }
    throw "Unknown error occurred";
  }
};

// Iniciar sesión con Google
export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: unknown) {
    console.error("Hubo un error al iniciar sesión con Google", error);
    if (error instanceof Error) {
      throw error.message;
    }
    throw "An unknown error occurred";
  }
};

// Detectar usuario autenticado
export const authStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
