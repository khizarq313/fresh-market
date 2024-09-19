import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import LoadingBar from 'react-top-loading-bar';
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import { store } from "./store";
import { setProducts } from "./features/products/productsSlice";
import { products, cartProducts } from "./productsData";
import "./styles/App.scss";

const AppContent: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [showCartPage, setShowCartPage] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts({products:products, cart: cartProducts}));
  }, [dispatch]);

  return (
    <Router>
      <LoadingBar color='#2A6049' height={6} progress={progress} onLoaderFinished={() => setProgress(0)}/>
      <section className="App">
        <Header setShowCartPage={setShowCartPage} />
        <AppRoutes  setProgress={setProgress} />
        <Footer />
      </section>
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
