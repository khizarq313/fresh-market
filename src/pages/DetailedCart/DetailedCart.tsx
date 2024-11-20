import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { handleCartItems, ProductType } from '../../features/products/productsSlice';
import Lock from '../../assets/icons/Lock';
import "./DetailedCart.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Delete from '../../assets/icons/Delete';
import Tag from '../../assets/icons/Tag';
import Note from '../../assets/icons/Note';
import Minus from '../../assets/icons/Minus';
import Plus from '../../assets/icons/Plus';

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    currentPageHeading: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
    setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

const DetailedCart: React.FC<PropsType> = (props) => {

    const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartProducts = useSelector((state: RootState) => state.products.cart);
    const totalCartPrice = cartProducts.reduce((total, product) => total + (product.price - product.discount) * product.quantity, 0);
    const totalDeliveryCharges = cartProducts.reduce((total, product) => total + product.delivery, 0);
    const [promoCode, setPromoCode] = useState<boolean>(false);
    const [note, setNote] = useState<boolean>(false);

    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
            setProgress(100);
        }, 1000)
    }, [setProgress]);

    const incrementCartItem = function(tempIndex: number) {
        dispatch(handleCartItems({ index: tempIndex, method: "increment", quantity: 0}));
      }
  
      const decrementCartItem = function(tempIndex: number) {
        dispatch(handleCartItems({ index: tempIndex, method: "decrement", quantity: 0}));
      }
  
      const updateItemQuantity = function(currentQuantity:number ,tempIndex: number) {
        if(currentQuantity < 1) {
          dispatch(handleCartItems({ index: tempIndex, method: "update", quantity: 1}));
        } else if(currentQuantity > 20) {
          dispatch(handleCartItems({ index: tempIndex, method: "update", quantity: 20}));
        } else {
          dispatch(handleCartItems({ index: tempIndex, method: "update", quantity: currentQuantity}));
        }
      }
  
      const deleteCartItem = function(tempIndex: number) {
        dispatch(handleCartItems({ index: tempIndex, method: "delete", quantity: 0}));
      }
  
      const handleBackspaceKey = function(e:React.KeyboardEvent<HTMLInputElement>, tempIndex: number) {
        if(e.key === "Backspace" && e.target instanceof HTMLInputElement && Number(e.target.value) < 10) {
            e.target.value = "";
        }
      }
  
      const handleBlueEvent = function(e: React.FocusEvent<HTMLInputElement>, tempIndex: number) {
        if(e.target.value === "") {
          e.target.value = "1";
          dispatch(handleCartItems({ index: tempIndex, method: "update", quantity: 1}));
        }
      }

      const openThePage = function(pageName: string) {
        if(pageName === "/demo-version") {
          navigate(pageName);
        } else if(pageName !== currentPageHeading) {
          navigate(pageName);
          setCurrentPageHeading(pageName);
        }
      }
    
  return (
    <section className='detailed-cart'>
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className='detailed-cart-content'>
        { cartProducts.length >= 1 &&
          <>
            <div className="cart-products-list">
              <h1>My cart</h1>
              <div className="detailed-cart-products-container">
                {cartProducts.map((product: ProductType, index: number) => {
                  const tempIndex:number = cartProducts.findIndex((tempProduct: TempQuantitiesType) => tempProduct.id === product.id);
                  return (
                    <div className="detailed-cart-item" key={index}>
                      <span className='product-info'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        onClick={() => openThePage(`/shop/product-${product.id}`)}/>
                      <span>
                          <h3
                            className="product-name"
                            onClick={() => openThePage(`/shop/product-${product.id}`)}>
                            {product.name}
                          </h3>
                          <p
                            className="discount-price"
                            onClick={() => openThePage(`/shop/product-${product.id}`)}>
                            {product.discount > 0 && <del> ₹{product.price}</del>} ₹
                            {product.price - product.discount}
                          </p>
                        </span>
                      </span>
                      <span className='product-control-btns'>
                        <span className="cart-quantity-btn no-margin">
                          <button className="decrement-btn" disabled={cartProducts[tempIndex].quantity === 1}
                          onClick={() => decrementCartItem(tempIndex)}><Minus /></button>
                          { cartProducts.length > 0 && 
                          <input name={`product-${product.id+index}`} key={product.id + index} type="number" 
                          value={cartProducts[tempIndex].quantity} min="1" max="20" className='cart-quantity-input'
                          onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
                          onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlueEvent(e, tempIndex)}
                          onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value),tempIndex)}/> }
                          <button className="increment-btn" onClick={() => incrementCartItem(tempIndex)}><Plus /></button>
                        </span>
                        <h4
                          className="item-final-price"
                          onClick={() => openThePage(`/shop/product-${product.id}`)}>
                          ₹{(product.price - product.discount)*product.quantity}
                        </h4>
                        <button className="cart-delete-btn">
                          <span onClick={() => deleteCartItem(tempIndex)}>
                            <Delete />
                          </span>
                        </button>
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className='additional-details'>
                <span onClick={() => setPromoCode(!promoCode)}>
                  <Tag /> 
                  <p>Enter a promo code</p>
                </span>
                { promoCode && 
                <span className='promo-code'>
                  <input type="text" placeholder='Enter a promo code'/>
                  <button>Apply</button>
                </span>}
                <span onClick={() => setNote(!note)}>
                  <Note /> 
                  <p>Add a note</p>
                </span>
                { note && 
                <textarea maxLength={250} placeholder="Instructions? Special requests? Add them here"></textarea>}
              </div>
            </div>
            <div className='order-summary'>
                <h1>Order summary</h1>
                <span className='cart-subtotal-span'>
                    <p>Subtotal</p>
                    <p>₹{totalCartPrice}</p>
                </span>
                <span>
                    <p>Delivery charges</p>
                    {totalDeliveryCharges > 0 && 
                        <p>₹{totalDeliveryCharges}</p>
                    }
                    {totalDeliveryCharges === 0 && 
                        <p>Free</p>
                    }
                </span>
                <span className='border-bottom'>
                    <p><u>Estimate Delivery</u></p>
                    <p>2hrs</p>
                </span>
                <span className='cart-total-span'>
                    <p>Total</p>
                    <p>₹{totalCartPrice}</p>
                </span>
                <span className='checkout-btn'>
                  <button onClick={() => openThePage("/demo-version")}>Checkout</button>
                  <span className='checkout-description'><Lock /><p>Secure Checkout</p></span>
                </span>
            </div>
          </>
        }
        { cartProducts.length === 0 &&
          <div className='empty-detailed-cart'>
            <h1>My cart</h1>
            <span>
              <h2>Cart is empty</h2>
              <button onClick={() => openThePage("/shop")}><u>Continue Browsing</u></button>
            </span>
          </div>
        }
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default DetailedCart