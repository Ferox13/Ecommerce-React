import { useState, FormEvent, ChangeEvent, FC } from "react";
import { loginUser, loginWithGoogle } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await loginWithGoogle();
      toast.success("Sesión iniciada con Google");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al iniciar sesión con Google");
      }
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-light"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
        }}
      >
        Iniciar sesión
      </h1>{" "}
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column gap-3 mt-3 w-100"
        style={{ maxWidth: "320px" }}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            className="form-control bg-secondary text-light border-0"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            className="form-control bg-secondary text-light border-0"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 mt-3"
        style={{ maxWidth: "320px" }}
      >
        <FcGoogle size={20} /> Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
