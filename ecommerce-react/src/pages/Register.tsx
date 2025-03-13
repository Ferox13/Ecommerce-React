import { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormData, FormErrors } from "../types";
import "../components/Login/login.css";


const Register = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) newErrors.username = "El nombre de usuario es obligatorio";
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";

    // Validación si es mayor de 18 años
    const birthDate = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria";
    else if (age < 18) newErrors.birthDate = "Debes ser mayor de 18 años";

    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpia el error cuando el usuario edita
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(formData.email, formData.password, {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
      });

      toast.success("Registro exitoso, iniciando sesión...");
      navigate("/");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error en el registro: " + errorMessage);
    }
  };

  return (
    <div 
      className="container" 
      style={{ 
        color: "#fff", 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "1rem"
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
      <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
        }}
      >
       Registro
      </h1>{" "}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="mb-3">
            <input 
              type="text" 
              name="username" 
              placeholder="Nombre de usuario" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="form-control" 
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="text" 
              name="firstName" 
              placeholder="Nombre" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="text" 
              name="lastName" 
              placeholder="Apellido" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="email" 
              name="email" 
              placeholder="Correo" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="date" 
              name="birthDate" 
              value={formData.birthDate} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.birthDate && <div className="text-danger">{errors.birthDate}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña (mínimo 6 caracteres)" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirmar contraseña" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </div>

          <button 
            type="submit" 
            className="btn"
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "4px"
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;