import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store";
import { ProductType, handleCartItems } from "../../features/products/productsSlice";
import "./Cart.scss"

type PropsType = {
    setShowCartPage: Dispatch<SetStateAction<boolean>>
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

const Cart: React.FC<PropsType> = (props) => {
    const {setShowCartPage} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state.products.cart);
    const totalCartPrice = cartProducts.reduce((total, product) => total + (product.price - product.discount) * product.quantity, 0);
    const [closeCartAnimation, setCloseCartAnimation] = useState<boolean>(false);

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

    const closeCart = function() {
      setCloseCartAnimation(true);
      setTimeout(() => {
        setCloseCartAnimation(false);
        setShowCartPage(false);
      }, 400)
    }

    const openDetailedCart = function() {
      closeCart();
      navigate("cart");
    }

  return (
    <section className="cart-page">
        <div className={closeCartAnimation? "overlay overlay-closed": "overlay"} onClick={closeCart}></div>
        <div className={closeCartAnimation? "cart-content cart-closed": "cart-content"}>
          <div className="cart-header">
            <button className="cart-close-btn" onClick={closeCart}>Close</button>
            <h1>CART</h1>
          </div>
          { cartProducts.length >= 1 &&
            <>
              <div className="cart-products-container">
                {cartProducts.map((product: ProductType, index: number) => {
                  const tempIndex:number = cartProducts.findIndex((tempProduct: TempQuantitiesType) => tempProduct.id === product.id);
                  return (
                    <div className="cart-item" key={index}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        onClick={() => navigate(`/shop/${product.id}`)}/>
                        <span className="product-details">
                          <h3
                            className="product-name"
                            onClick={() => navigate(`/shop/${product.id}`)}>
                            {product.name}
                          </h3>
                          <p
                            className="discount-price"
                            onClick={() => navigate(`/shop/${product.id}`)}>
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
              <div className="cart-footer">
                <h1>Subtotal</h1>
                <h1>₹{totalCartPrice}</h1>
                <hr />
                <button onClick={openDetailedCart}>View Cart</button>
              </div>
            </>
          }
          {
            cartProducts.length === 0 && 
            <h1>Cart is empty</h1>
          }
        </div>
    </section>
  )
}

export default Cart;