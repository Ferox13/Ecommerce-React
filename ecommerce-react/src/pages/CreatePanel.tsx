import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { toast } from "react-toastify";
import { UploadCloud } from "lucide-react";
import "../index.css"; 

const CreatePanel = () => {
  const { addNewProduct } = useProducts();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "price") {
      const numValue = parseFloat(value);
      if (numValue < 0) {
        return;
      }
    }
    
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData.title || !productData.price || !productData.description || !imageFile) {
      toast.error("Completa todos los campos y selecciona una imagen");
      return;
    }

    try {
      // Subir imagen al servidor
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al subir la imagen");

      // Guardar producto con URL de la imagen local
      await addNewProduct({ ...productData, price: Number(productData.price), image: data.imageUrl });

      setProductData({ title: "", price: "", description: "", image: "" });
      setImageFile(null);
      toast.success("Producto agregado con imagen local");
    } catch (error) {
      toast.error("Error al subir la imagen");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4 ">
   <h1
        className="py-4 text-center text-white fw-light border-bottom border-white border-opacity-25 mb-4"
        style={{
          letterSpacing: "1.5px",
          fontSize: "2.2rem",
        }}
      >
        Crear producto
      </h1>{" "}
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="title" className="form-label dark-label">Nombre del producto</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Nombre del producto"
            value={productData.title}
            onChange={handleChange}
            required
            className="form-control dark-input"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="price" className="form-label dark-label">Precio</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Precio"
            value={productData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="form-control dark-input"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label dark-label">Descripción</label>
          <textarea
            name="description"
            id="description"
            placeholder="Descripción del producto"
            value={productData.description}
            onChange={handleChange}
            required
            className="form-control dark-input"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label dark-label">
            Imagen <UploadCloud size={16} className="icon" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="form-control dark-input"
          />
        </div>

        <button type="submit" className="btn btn-primary dark-btn">Agregar Producto</button>
      </form>
    </div>
  );
};

export default CreatePanel;