import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import { store } from "./store";
import { setProducts } from "./features/products/productsSlice";
import { products, cartProducts } from "./productsData";
import "./styles/App.scss";

const AppContent: React.FC = () => {
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
  const [showCartPage, setShowCartPage] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts({products:products, cart: cartProducts}));
  }, [dispatch]);

  return (
    <Router>
      <section className={showLoginPage ? "hide" : "App"}>
        <Header setShowLoginPage={setShowLoginPage} setShowCartPage={setShowCartPage} />
        <AppRoutes />
        <Footer />
      </section>
      {showLoginPage && <Login setShowLoginPage={setShowLoginPage} />}
      {showCartPage && <Cart setShowCartPage={setShowCartPage} />}
    </Router>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
