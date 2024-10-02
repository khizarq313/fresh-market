import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { handleCartItems, ProductType } from '../../features/products/productsSlice';
import Lock from '../../assets/icons/Lock';
import "./DetailedCart.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
          setCurrentPageHeading(pageName);
        } else if(pageName !== currentPageHeading) {
          navigate(pageName);
          setCurrentPageHeading(pageName);
        }
      }
    
  return (
    <>
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className='detailed-cart'>
        { cartProducts.length >= 1 &&
          <>
            <div className="cart-products-list">
              <h1>My cart</h1>
              <div className="cart-products-container">
                {cartProducts.map((product: ProductType, index: number) => {
                  const tempIndex:number = cartProducts.findIndex((tempProduct: TempQuantitiesType) => tempProduct.id === product.id);
                  return (
                    <div className="cart-item" key={index}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        onClick={() => openThePage(`/shop/${product.id}`)}/>
                        <span className="product-details">
                          <h3
                            className="product-name"
                            onClick={() => openThePage(`/shop/${product.id}`)}>
                            {product.name}
                          </h3>
                          <p
                            className="discount-price"
                            onClick={() => openThePage(`/shop/${product.id}`)}>
                            {product.discount > 0 && <del> ₹{product.price}</del>} ₹
                            {product.price - product.discount}
                          </p>
                          <span className="quantity-btn">
                            <button className="decrement-btn" disabled={cartProducts[tempIndex].quantity === 1}
                            onClick={() => decrementCartItem(tempIndex)}>-</button>
                            { cartProducts.length > 0 && 
                            <input name={`product-${product.id+index}`} key={product.id + index} type="number" 
                            value={cartProducts[tempIndex].quantity} min="1" max="20"
                            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlueEvent(e, tempIndex)}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value),tempIndex)}/> }
                            <button className="increment-btn" onClick={() => incrementCartItem(tempIndex)}>+</button>
                          </span>
                        </span>
                        <button className="cart-delete-btn" onClick={() => deleteCartItem(tempIndex)}>
                          delete
                        </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='order-summary'>
                <h1>Order summary</h1>
                <span>
                    <p>Subtotal</p>
                    <p>₹{totalCartPrice}</p>
                </span>
                <span>
                    <p>Delivery charges</p>
                    {totalDeliveryCharges > 0 && 
                        <p>{totalDeliveryCharges}</p>
                    }
                    {totalDeliveryCharges === 0 && 
                        <p>Free</p>
                    }
                </span>
                <span className='border-bottom'>
                    <p>Estimate Delivery</p>
                    <p>8hrs</p>
                </span>
                <span>
                    <p>Total</p>
                </span>
                <button onClick={() => openThePage("/demo-version")}>Checkout</button>
                <p><Lock />Secure Checkout</p>
            </div>
          </>
        }
        { cartProducts.length === 0 &&
          <div>
            <h1>My cart</h1>
            <span>
              <h1>Cart is empty</h1>
              <button onClick={() => openThePage("/shop")}>Continue Browsing</button>
            </span>
          </div>
        }
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </>
  )
}

export default DetailedCart