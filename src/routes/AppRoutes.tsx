import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Shop from "../pages/Shop/Shop";
import ShippingAndReturns from "../pages/ShippingAndReturns/ShippingAndReturns";
import StorePolicy from "../pages/StorePolicy/StorePolicy";
import FAQ from "../pages/FAQ/FAQ";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductType } from "../features/products/productsSlice";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const AppRoutes: React.FC<PropsType> = (props) => {
  const {setProgress} = props;

  const allProducts = useSelector((state: RootState) => state.products);
  const products: ProductType[] = allProducts.products;

  return (
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />} />
        <Route path="/shop" element={<Shop setProgress={setProgress} />} />
        <Route path="/about" element={<About setProgress={setProgress} />} />
        <Route path="/contact" element={<Contact setProgress={setProgress} />} />
        <Route path="/shipping-and-returns" element={<ShippingAndReturns setProgress={setProgress} />} />
        <Route path="/store-policy" element={<StorePolicy setProgress={setProgress} />} />
        <Route path="/faq" element={<FAQ setProgress={setProgress} />} />
        {
          products.map((product: ProductType, index: number) => {
            return(
              <Route key={index} path={`/product-${product.id}`} element={<Product productDetails={product} />} />
            )
          })
        }
      </Routes>
  );
};

export default AppRoutes;
