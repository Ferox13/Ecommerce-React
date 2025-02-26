import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { ProductContextType } from "../types";

export const useProductsHome = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductsHome must be used within a ProductProvider");
  }
  const productsHome = { ...context, products: context.products.slice(0, 4) };
  return productsHome;
};