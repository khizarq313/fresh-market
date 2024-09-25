import React, { useEffect, useState } from "react";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import "./Product.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
  productDetails: ProductType,
  parentLocation: string
}

const Product: React.FC<PropsType> = (props) => {

  const {setProgress, productDetails, parentLocation} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [openDetails, setOpenDetails] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  
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
    dispatch(updateCart({ id: id, quantity: currentQuantity }));
    setProductQuantity(1);
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
  
  return (
    <main className="product-page">
      <div>
        <span>
          <button className="nav-btns" onClick={() => navigate("/home")}>Home/</button>
          {parentLocation === "shop" && 
          <button className="nav-btns" onClick={() => navigate("/shop")}>Shop/</button>}
          <button className="nav-btns">{productDetails.name}</button>
        </span>
        <img
            src={productDetails.image}
            alt={productDetails.name}
            className="product-image"/>
        <p>I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.</p>
      </div>
      <div>
        <h1
          className="product-name">
          {productDetails.name}
        </h1>
        <p
          className="discount-price">
          {productDetails.discount > 0 && <del> ₹{productDetails.price}</del>} ₹
          {productDetails.price - productDetails.discount}
        </p>
        <h2>Quantity</h2>
        <input type="number" min={1} max={20} className="product-quantity" 
        value={productQuantity} onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e)}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlurEvent(e)}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value))}/>
        <button
          className="add-to-cart-btn"
          onClick={() => handleCart(productDetails.id, productQuantity)}>
          Add to Cart
        </button>
        <button>Buy Now</button>
        <details className='styled' open={openDetails === 1 && isOpen} 
          onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 1)}>
              <summary>PRODUCT INFO</summary>
              <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
          </details>
          <details className='styled' open={openDetails === 2 && isOpen} 
          onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 2)}>
              <summary>REFUND POLICY</summary>
              <p>I'm a Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
          </details>
          <details className='styled' open={openDetails === 3 && isOpen} 
          onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 3)}>
              <summary>SHIPPING INFO</summary>
              <p>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>
          </details>
      </div>
    </main>
  )
}

export default Product