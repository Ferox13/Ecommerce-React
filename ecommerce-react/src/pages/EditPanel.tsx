import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { toast } from "react-toastify";
import { getProductById } from "../api/product";
import Loader from "../components/Loader";
import "../index.css"; 

const EditPanel = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar datos del producto existente
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error("ID de producto no válido");
        navigate("/admin");
        return;
      }

      try {
        const product = await getProductById(id);
        if (!product) {
          toast.error("Producto no encontrado");
          navigate("/admin");
          return;
        }

        setProductData({
          title: product.title || "",
          price: String(product.price) || "",
          description: product.description || "",
          image: product.image || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar el producto");
        console.error("Error al cargar producto:", error);
        navigate("/admin");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      toast.error("ID de producto no válido para actualizar");
      navigate("/admin");
      return;
    }

    if (!productData.title || !productData.price || !productData.description) {
      toast.error("Completa todos los campos requeridos");
      return;
    }

    try {
      let imageUrl = productData.image; // Usar la imagen actual por defecto

      // Solo subir nueva imagen si se seleccionó un archivo
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Error al subir la imagen");

        imageUrl = data.imageUrl; // Actualizar URL con la nueva imagen
      }

      // Actualizar producto con la imagen (nueva o existente)
      await updateProduct(id, {
        ...productData,
        price: Number(productData.price),
        image: imageUrl,
      });

      toast.success("Producto actualizado correctamente");
      navigate("/admin");
    } catch (error) {
      toast.error("Error al actualizar el producto");
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4 dark-container">
      <h2 className="mb-4 text-light">Editar Producto</h2>

      <form onSubmit={handleSubmit} className="dark-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label dark-label">
            Nombre del producto
          </label>
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
          <label htmlFor="price" className="form-label dark-label">
            Precio
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Precio"
            value={productData.price}
            onChange={handleChange}
            required
            className="form-control dark-input"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label dark-label">
            Descripción
          </label>
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

        {/* Mostrar la imagen actual */}
        {productData.image && (
          <div className="mb-3">
            <label className="form-label dark-label">Imagen actual:</label>
            <div>
              <img
                src={`http://localhost:5000${productData.image}`}
                alt="Imagen actual"
                className="img-thumbnail bg-dark"
                style={{ maxHeight: "200px", maxWidth: "200px" }}
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="image" className="form-label dark-label">
            Nueva imagen (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control dark-input"
          />
          <small className="form-text text-white">
            Si no seleccionas una nueva imagen, se mantendrá la actual.
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default EditPanel;
