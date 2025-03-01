import { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define interfaces for form data and errors
interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  password?: string;
  confirmPassword?: string;
}

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
    setErrors({ ...errors, [name]: "" }); // Limpiando el error cuando el usuario edita
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
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h2 className="mb-4 fw-bold">Registro</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <input 
            type="text" 
            name="username" 
            placeholder="Nombre de usuario" 
            value={formData.username} 
            onChange={handleChange} 
            required 
            className="form-control" 
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
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;