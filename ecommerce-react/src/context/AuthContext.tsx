import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../api/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

// Definimos la interfaz para el valor del contexto de autenticación
// Esta interfaz especifica qué datos y funciones estarán disponibles en el contexto
interface AuthContextType {
  user: User | null; // El usuario autenticado o null si no hay sesión
  logout: () => Promise<void>; // Función para cerrar sesión
}

// Creamos el contexto con tipado adecuado
// El valor inicial es undefined, se establecerá en el Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Interfaz para las props del AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Los componentes hijos que tendrán acceso al contexto
}

// Componente proveedor que encapsula la lógica de autenticación
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Estado para almacenar el usuario actual
  const [user, setUser] = useState<User | null>(null);
  // Estado para controlar si estamos cargando la información de autenticación
  const [loading, setLoading] = useState<boolean>(true);

  // Efecto que se ejecuta una vez al montar el componente
  // Configura un oyente para los cambios en el estado de autenticación
  useEffect(() => {
    // Nos suscribimos a los cambios de estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser); // Actualiza el estado con el usuario actual
      setLoading(false); // Marca la carga como completada
    });

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    await signOut(auth); // Cierra sesión en Firebase
    setUser(null); // Actualiza el estado local manualmente
  };

  // Proporciona el contexto a todos los componentes hijos
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {/* Renderiza los hijos solo cuando la carga inicial ha terminado */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar el uso del contexto de autenticación
export const useAuth = (): AuthContextType => {
  // Obtiene el contexto actual
  const context = useContext(AuthContext);
  // Verifica que el hook se use dentro de un AuthProvider
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};