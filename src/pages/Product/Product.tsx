import React, { useEffect, useState } from "react";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import "./Product.scss";
import "../Demo/Demo.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Checked from "../../assets/icons/Checked";
import Arrow from "../../assets/icons/Arrow";
import Plus from "../../assets/icons/Plus";
import Minus from "../../assets/icons/Minus";
import Wrong from "../../assets/icons/Wrong";
import { AnimatePresence, motion } from "framer-motion";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
  productDetails: ProductType,
  parentLocation: string,
}

type AnimationIdList = {
  id: number,
  pulse: boolean,
  tick: boolean
}

const Product: React.FC<PropsType> = (props) => {

  const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage, productDetails, parentLocation} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [openDetails, setOpenDetails] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [demoWindow, setDemoWindow] = useState<boolean>(false);
  const [animationIdList, setAnimationIdList] = useState<AnimationIdList[]>([]);
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
        setProgress(100);
    }, 1000)
  }, [setProgress]);

  const updateItemQuantity = function(currentQuantity:number) {
    if(currentQuantity < 1) {
      setProductQuantity(1);
    } else if(currentQuantity > 20) {
     setProductQuantity(20);
    } else {
      setProductQuantity(currentQuantity);
    }
  }

  const handleBackspaceKey = function(e:React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === "Backspace" && e.target instanceof HTMLInputElement && Number(e.target.value) < 10) {
        e.target.value = "";
    }
  }

  const handleBlurEvent = function(e: React.FocusEvent<HTMLInputElement>) {
    if(e.target.value === "") {
      e.target.value = "1";
    }
  }

  const handleCart = function(id: number, currentQuantity: number) {
    const tempId: AnimationIdList = {
      id: id,
      pulse: true,
      tick: false
    } 
    const tempId2 = {
      id: id,
      pulse: false,
      tick: true
    }
    setAnimationIdList([tempId, ...animationIdList]);
    setTimeout(() => {
      setAnimationIdList(animationIdList.filter((product: AnimationIdList) => (product.id !== tempId.id)));
      setAnimationIdList([tempId2, ...animationIdList]);
    }, 600);
    setTimeout(() => {
      setAnimationIdList(animationIdList.filter((product: AnimationIdList) => (product.id !== tempId2.id)));
      dispatch(updateCart({ id: id, quantity: currentQuantity }));
      setProductQuantity(1);
    }, 1200);
  }

  const toggleDetails = function(e: React.MouseEvent<HTMLDetailsElement>, n: number) {
    e.preventDefault();
    if(openDetails === n) {
        setIsOpen(!isOpen);
    } else {
        setOpenDetails(n);
        setIsOpen(true);
    }
  }

  const openThePage = function(pageName: string) {
    if(pageName !== currentPageHeading) {
      if(pageName === "/home") {
        setCurrentPageHeading("/");
      } else {
        setCurrentPageHeading(pageName);
      }
      navigate(pageName);
    }
  }

  const animationOff = function(id: number) {
    return animationIdList.filter((tempProduct: AnimationIdList) => tempProduct.id === id).length !== 1;
  }

  const animationOn = function(id: number) {
    return animationIdList.filter((tempProduct: AnimationIdList) => 
      {return tempProduct.id === id && tempProduct.pulse && !tempProduct.tick}).length === 1;
  }

  const tickAnimation = function(id: number) {
    return animationIdList.filter((tempProduct: AnimationIdList) => 
      {return tempProduct.id === id && !tempProduct.pulse && tempProduct.tick}).length === 1;
  }

  const disableBtn = function() {
    return animationIdList.length > 0;
  }
  
  return (
    <section className="product-page">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="product-page-main">
        <span className="nav-btns-container">
          <button className="nav-btns" onClick={() => openThePage("/home")}><Arrow />Back to Home</button>
          {/* {parentLocation === "shop" && 
            <button className="nav-btns" onClick={() => openThePage("/shop")}>Shop/</button>}
          <button className="nav-btns">{productDetails.name}</button> */}
        </span>
        <div className="product-page-content">
          <div className="product-container">
            <span className="img-container">
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="product-image"/>
            </span>
            <p className="product-description">{productDetails.description}</p>
          </div>
          <div className="product-additionals">
            <span className="product-main-info">
              <span className="product-info-wrapper">
                <h1
                  className="product-name">
                  {productDetails.name}
                </h1>
                <p
                  className="product-price">
                  {productDetails.discount > 0 && <del> ₹{productDetails.price}</del>} ₹
                  {productDetails.price - productDetails.discount}
                </p>
              </span>
              <span className="product-info-wrapper">
                <h2 className="quantity-label">Quantity</h2>
                <span className="product-quantity-container">
                  <input type="number" min={1} max={20} className="product-quantity" id={productDetails.id.toString()}
                  value={productQuantity} onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e)}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlurEvent(e)}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value))}/>
                  <span className="quantity-btns">
                    <button className="quantity-increment-btn" disabled={animationIdList.length === 1 || productQuantity === 20} 
                      onClick={() => setProductQuantity(productQuantity + 1)}><Arrow /></button>
                    <button className="quantity-decrement-btn"  disabled={animationIdList.length === 1 || productQuantity === 1}
                      onClick={() => setProductQuantity(productQuantity - 1)}><Arrow /></button>
                  </span>
                </span>
              </span>
            </span>
            <button
              className="product-cart-btn"
              disabled={disableBtn()}
              onClick={() => handleCart(productDetails.id, productQuantity)}>
              { animationOff(productDetails.id) && <>Add to Cart</>}
              { animationOn(productDetails.id) && <div className="dot-pulse-2"></div>}
              { tickAnimation(productDetails.id) && <Checked />}
            </button>
            <button className="product-buy-btn" onClick={() => setDemoWindow(true)}>Buy Now</button>
            <p className="product-description-mobile">{productDetails.description}</p>
            <details className='details-tag' open={openDetails === 1 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 1)}>
                <summary>
                  <p>PRODUCT INFO</p> 
                  {(openDetails !== 1 || !isOpen) && <Plus /> }
                  {openDetails === 1 && isOpen && <Minus /> }
                </summary>
                <p>{productDetails.info}</p>
            </details>
            <details className='details-tag top-bottom-border' open={openDetails === 2 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 2)}>
                <summary>
                  <p>REFUND POLICY</p>
                  {(openDetails !== 2 || !isOpen) && <Plus /> }
                  {openDetails === 2 && isOpen && <Minus /> }
                </summary>
                <p>If you're not satisfied with your purchase, contact our customer support for a quick return or exchange. We make the process easy to ensure your satisfaction.</p>
            </details>
            <details className='details-tag' open={openDetails === 3 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 3)}>
                <summary>
                  <p>SHIPPING INFO</p>
                  {(openDetails !== 3 || !isOpen) && <Plus /> }
                  {openDetails === 3 && isOpen && <Minus /> }
                </summary>
                <p>We offer reliable and timely shipping options with transparent pricing. Rest assured, your order will be carefully packaged and delivered to you efficiently.</p>
            </details>
          </div>
        </div>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
       <AnimatePresence>
        {demoWindow && 
        <motion.section 
          className='demo-page'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }} >
          <button className='close-btn' onClick={() => setDemoWindow(false)}><Wrong /></button>
          <h1>Demo Mode</h1>
          <p>This is just a demo version</p>
          <button className='ok-btn' onClick={() => setDemoWindow(false)}>OK</button>
        </motion.section>
        }
       </AnimatePresence>
    </section>
  )
}

export default Product