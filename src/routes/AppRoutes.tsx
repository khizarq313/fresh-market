import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Shop from "../pages/Shop/Shop";
import ShippingAndReturns from "../pages/ShippingAndReturns/ShippingAndReturns";
import StorePolicy from "../pages/StorePolicy/StorePolicy";
import FAQ from "../pages/FAQ/FAQ";
import DetailedCart from "../pages/DetailedCart/DetailedCart";
import Demo from "../pages/Demo/Demo";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductType } from "../features/products/productsSlice";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const AppRoutes: React.FC<PropsType> = (props) => {
  const { setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage } = props;
  const allProducts = useSelector((state: RootState) => state.products);
  const products: ProductType[] = allProducts.products;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="*"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <Home 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <Home 
              setProgress={setProgress}  
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        /> 
        <Route
          path="/shop"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <Shop 
              setProgress={setProgress} 
              type="shop" 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/search-results"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <Shop 
              setProgress={setProgress} 
              type="search-results" 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <About 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <Contact 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/shipping-and-returns"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <ShippingAndReturns 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/store-policy"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <StorePolicy 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/faq"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <FAQ 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading} 
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/cart"
          element={
            <motion.div {...pageTransition} className="motion-div">
              <DetailedCart 
              setProgress={setProgress} 
              currentPageHeading={currentPageHeading} 
              setCurrentPageHeading={setCurrentPageHeading}
              setShowCartPage={setShowCartPage} 
              />
            </motion.div>
          }
        />
        <Route
          path="/demo-page"
          element={
            <motion.div {...pageTransition} className="motion-div demo-container">
              <Demo 
              setProgress={setProgress} 
              type="normal" 
              currentPageHeading={currentPageHeading}
              />
            </motion.div>
          }
        />
        <Route
          path="/demo-version"
          element={
            <motion.div {...pageTransition} className="motion-div demo-container">
              <Demo 
              setProgress={setProgress} 
              type="checkout" 
              currentPageHeading={currentPageHeading}
              />
            </motion.div>
          }
        />
        {products.map((product: ProductType, index: number) => (
          <Route
            key={`home-${index}`}
            path={`/product-${product.id}`}
            element={
              <motion.div {...pageTransition} className="motion-div">
                <Product 
                setProgress={setProgress} 
                currentPageHeading={currentPageHeading} 
                setCurrentPageHeading={setCurrentPageHeading}
                setShowCartPage={setShowCartPage} 
                productDetails={product} 
                parentLocation="home" 
                />
              </motion.div>
            }
          />
        ))}
        {products.map((product: ProductType, index: number) => (
          <Route
            key={`shop-${index}`}
            path={`/shop/product-${product.id}`}
            element={
              <motion.div {...pageTransition} className="motion-div">
                <Product
                  setProgress={setProgress}
                  currentPageHeading={currentPageHeading} 
                  setCurrentPageHeading={setCurrentPageHeading} 
                  setShowCartPage={setShowCartPage}
                  productDetails={product}
                  parentLocation="shop"
                />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
