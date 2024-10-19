import React, { useEffect, useState } from "react";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import "./Product.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Checked from "../../assets/icons/Checked";
import Arrow from "../../assets/icons/Arrow";

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
      navigate(pageName);
      setCurrentPageHeading(pageName);
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
      <main className="product-page-content">
        <div className="img-container">
          <span className="nav-btns-container">
            <button className="nav-btns" onClick={() => openThePage("/home")}>Home/</button>
            {parentLocation === "shop" && 
            <button className="nav-btns" onClick={() => openThePage("/shop")}>Shop/</button>}
            <button className="nav-btns">{productDetails.name}</button>
          </span>
          <img
              src={productDetails.image}
              alt={productDetails.name}
              className="product-image"/>
          <p>I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.</p>
        </div>
        <div className="product-additionals">
          <h1
            className="product-name">
            {productDetails.name}
          </h1>
          <p
            className="product-price">
            {productDetails.discount > 0 && <del> ₹{productDetails.price}</del>} ₹
            {productDetails.price - productDetails.discount}
          </p>
          <h2 className="quantity-label">Quantity</h2>
          <span className="product-quantity-container">
            <input type="number" min={1} max={20} className="product-quantity" 
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
          <button
            className="product-cart-btn"
            disabled={disableBtn()}
            onClick={() => handleCart(productDetails.id, productQuantity)}>
            { animationOff(productDetails.id) && <>Add to Cart</>}
            { animationOn(productDetails.id) && <div className="dot-pulse-2"></div>}
            { tickAnimation(productDetails.id) && <Checked />}
          </button>
          <button className="product-buy-btn" onClick={() => openThePage("/demo-page")}>Buy Now</button>
          <details className='details-tag' open={openDetails === 1 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 1)}>
                <summary>PRODUCT INFO</summary>
                <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
            </details>
            <details className='details-tag top-bottom-border' open={openDetails === 2 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 2)}>
                <summary>REFUND POLICY</summary>
                <p>I'm a Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
            </details>
            <details className='details-tag' open={openDetails === 3 && isOpen} 
            onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 3)}>
                <summary>SHIPPING INFO</summary>
                <p>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>
            </details>
        </div>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default Product