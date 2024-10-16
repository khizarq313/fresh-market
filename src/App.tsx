import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import LoadingBar from 'react-top-loading-bar';
import AppRoutes from "./routes/AppRoutes";
import Cart from "./pages/Cart/Cart";
import ScrollToTopWrapper from "./features/ScrollToTopWrapper/ScrollToTopWrapper";
import { store } from "./store";
import { setProducts } from "./features/products/productsSlice";
import { products, cartProducts, searchProducts } from "./productsData";
import "./styles/App.scss";

const AppContent: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [showCartPage, setShowCartPage] = useState<boolean>(false);
  const [currentPageHeading, setCurrentPageHeading] = useState<string>("/");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts({products:products, cart: cartProducts, searchProducts: searchProducts}));
  }, [dispatch]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <Router>
      <LoadingBar color='#2A6049' height={6} progress={progress} onLoaderFinished={() => setProgress(0)}/>
      <section className={"App"}>
        <ScrollToTopWrapper>
          <AppRoutes setProgress={setProgress} currentPageHeading={currentPageHeading} 
            setCurrentPageHeading={setCurrentPageHeading} setShowCartPage={setShowCartPage}/>
        </ScrollToTopWrapper>
      </section>
      {showCartPage && <Cart setShowCartPage={setShowCartPage}  currentPageHeading={currentPageHeading} 
        setCurrentPageHeading={setCurrentPageHeading}/>}
    </Router>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
