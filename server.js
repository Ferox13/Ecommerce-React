const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// CORS para evitar problemas
app.use(cors());

// Configuración de Multer (Las imágenes se están guardando "uploads/")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // El nombre se genera basado en la fecha
  },
});

const upload = multer({ storage });

// Usando imágenes desde la carpeta "uploads"
app.use("/uploads", express.static("uploads"));

// La ruta para subir imágenes
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }

  // Devolver la URL de la imagen subida
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});