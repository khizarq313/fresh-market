import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Banner1, Banner2, Banner3 } from "../../assets/images/All-Images";
import Bag from "../../assets/icons/Bag";
import Man from "../../assets/icons/Man";
import Van from "../../assets/icons/Van";
import "./Home.scss";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const Home: React.FC<PropsType> = (props) => {
  const {setProgress} = props;
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  return (
    <main className="home">
      <section className="welcome-section">
        <div className="welcome-txt">
          <h1 className="welcome-bold-heading">FRESH MARKET</h1>
          <h2 className="welcome-light-heading">GET EVERYTHING <br /> DELIVERED <br /> TO YOUR DOORSTEP</h2>
          <button className="welcome-shop-btn" onClick={() => navigate("/shop")}>ORDER NOW</button>
        </div>
        <div className="welcome-bg">
          <img src={Banner1} alt="banner1" className="bg-img1" />
          <img src={Banner2} alt="banner2" className="bg-img2" />
          <img src={Banner3} alt="banner3" className="bg-img3" />
        </div>
      </section>

      <ProductsList ListName="discount-products" PriceRange={Infinity}/>

      <ProductsList ListName="quick-deals" PriceRange={Infinity}/>

      <section className="benifits-section">
        <div>
          <Bag />
          <h2>Pick Up Options</h2>
          <p>I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
        </div>
        <hr />
        <div>
          <Van />
          <h2>Same Day Delivery</h2>
          <p>I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
        </div>
        <hr />
        <div>
          <Man />
          <h2>Health & Safety Rules</h2>
          <p>I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
