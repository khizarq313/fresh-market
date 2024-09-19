import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Shop from "../pages/Shop/Shop";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductType } from "../features/products/productsSlice";

const AppRoutes: React.FC = () => {

  const allProducts = useSelector((state: RootState) => state.products);
  const products: ProductType[] = allProducts.products;

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {
          products.map((product: ProductType) => {
            return(
              <Route path={`/product-${product.id}`} element={<Product productDetails={product} />} />
            )
          })
        }
      </Routes>
  );
};

export default AppRoutes;
