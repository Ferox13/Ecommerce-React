import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Copy & Links */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 VinylVault. Todos los derechos reservados.</p>
          <p>
            <a href="#" className="text-gray-400 hover:text-white">
              Política de privacidad
            </a>{" "}
            |{" "}
            <a href="#" className="text-gray-400 hover:text-white">
              Términos de servicio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

