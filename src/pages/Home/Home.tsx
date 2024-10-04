import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Banner1, Banner2, Banner3 } from "../../assets/images/All-Images";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Arrow from "../../assets/icons/Arrow";
import Bag from "../../assets/icons/Bag";
import Man from "../../assets/icons/Man";
import Van from "../../assets/icons/Van";
import "./Home.scss";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const Home: React.FC<PropsType> = (props) => {
  const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  const navigate = useNavigate();
  const controls = useAnimation();
  const [currentImage, setCurrentImage] = useState(1); 
  const [isManualScroll, setIsManualScroll] = useState(false);
  const images = [
    { id: 1, src: Banner1, altText: "Banner 1" },
    { id: 2, src: Banner2, altText: "Banner 2" },
    { id: 3, src: Banner3, altText: "Banner 3" },
  ];

  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  useLayoutEffect(() => {
    if (isManualScroll) {
      return;
    }
    const autoScroll = () => {
      const timeout = setTimeout(() => {
        if (currentImage === 1) {
          controls.start({ x: "-100%", transition: { duration: 1 } });
          setCurrentImage(2);
        } else if (currentImage === 2) {
          controls.start({ x: "-200%", transition: { duration: 1 } });
          setCurrentImage(3);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    };

    if (currentImage < 3) {
      autoScroll();
    }
  }, [currentImage, controls, isManualScroll]);

  const handleBack = function() {
    setIsManualScroll(true); 
    if (currentImage > 1) {
      const newImageIndex = currentImage - 1;
      controls.start({
        x: `-${(newImageIndex - 1) * 100}%`,
        transition: { duration: 1 },
      });
      setCurrentImage(newImageIndex);
    }
  };

  const handleFront = function() {
    setIsManualScroll(true); 
    if (currentImage < 3) {
      const newImageIndex = currentImage + 1;
      controls.start({
        x: `-${(newImageIndex - 1) * 100}%`,
        transition: { duration: 1 },
      });
      setCurrentImage(newImageIndex);
    }
  };

  const openThePage = function(pageName: string) {
    navigate(pageName);
  }

  return (
    <section className="home">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main>
        <section className="welcome-section">
          <div className="welcome-txt">
            <h1 className="welcome-bold-heading">FRESH MARKET</h1>
            <h2 className="welcome-light-heading">GET EVERYTHING <br /> DELIVERED <br /> TO YOUR DOORSTEP</h2>
            <button className="welcome-shop-btn" onClick={() => openThePage("/shop")}>ORDER NOW</button>
          </div>
          <div className="welcome-bg">
          <div className="img-carousel-btns">
            { currentImage !== 1 && 
              <button className="left-arrow" onClick={handleBack}>
                <Arrow />
              </button>
            }
            { currentImage !== 3 &&
              <button className="right-arrow" onClick={handleFront}>
                <Arrow />
              </button>
            }
          </div>
          <motion.div
            animate={controls}>
            {images.map((image) => (
              <img key={image.id} src={image.src} alt={image.altText} style={{ width: "100%" }} />
            ))}
          </motion.div>
        </div>
        </section>
        <ProductsList ListName="discount-products" PriceRange={Infinity} Page="home" setCurrentPageHeading={setCurrentPageHeading}/>
        <ProductsList ListName="quick-deals" PriceRange={Infinity} Page="home" setCurrentPageHeading={setCurrentPageHeading}/>
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
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  );
};

export default Home;
