import React, { useEffect, useState } from "react";
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
  const [showFilterPage, setShowFilterPage] = useState<boolean>(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isManualScroll) {
        if (currentImage === 1) {
          controls.start({ x: "-100%", transition: { duration: 1 } });
          setCurrentImage(2);
        } else if (currentImage === 2) {
          controls.start({ x: "-200%", transition: { duration: 1 } });
          setCurrentImage(3);
        }
      }
    }, 3000);

    return () => clearTimeout(timeout);
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

  const openThePage = function(pageName: string) 
  {if(pageName !== currentPageHeading) {
    if(pageName !== "/demo-page"){
      setCurrentPageHeading(pageName);
      setTimeout(() => {
        navigate(pageName);
      }, 300);
    } else {
      setCurrentPageHeading(currentPageHeading);
      setTimeout(() => {
        navigate(pageName);
      }, 300);
    }
  }
  }
  
  return (
    <section className="app-container">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="home">
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
              <img key={image.id} src={image.src} alt={image.altText}/>
            ))}
          </motion.div>
        </div>
        </section>
        <ProductsList 
          ListName="discount-products" 
          PriceRange={Infinity} 
          setPriceRange={setCurrentPageHeading}
          Page="home" 
          setCurrentPageHeading={setCurrentPageHeading}
          showFilterPage={showFilterPage}
          setShowFilterPage={setShowFilterPage}
          setCategory={setCurrentPageHeading}
          setCurrentShopItems={setCurrentPageHeading}/>
        <ProductsList 
          ListName="quick-deals" 
          PriceRange={Infinity} 
          setPriceRange={setCurrentPageHeading}
          Page="home" 
          setCurrentPageHeading={setCurrentPageHeading}
          showFilterPage={showFilterPage}
          setShowFilterPage={setShowFilterPage}
          setCategory={setCurrentPageHeading}
          setCurrentShopItems={setCurrentPageHeading}/>
        <section className="benifits-section">
          <div>
            <Bag />
            <h2>Pick Up Options</h2>
            <p>Choose a convenient pick-up time for your Fresh Market order and collect it hassle-free at our designated location.</p>
          </div>
          <hr />
          <div>
            <Van />
            <h2>Same Day Delivery</h2>
            <p>Enjoy same-day delivery for your Fresh Market orders. Shop now and get fresh products delivered to your doorstep quickly!</p>
          </div>
          <hr />
          <div>
            <Man />
            <h2>Health & Safety Rules</h2>
            <p>We follow strict health and safety standards to ensure your Fresh Market orders are fresh, clean, and handled with care.</p>
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
