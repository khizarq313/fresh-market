import React from "react";
import { ProductType } from "../../features/products/productsSlice";

type PropsType = {
  productDetails: ProductType
}

const Product: React.FC<PropsType> = (props) => {

  const {productDetails} = props;
  
  return (
    <main>
      <div>
        {productDetails.discount > 0 && (
          <h4 className="discount-tag">Special Price</h4>
        )}
        <img
          src={productDetails.image}
          alt={productDetails.name}
          className="product-image"/>
        <h3
          className="product-name">
          {productDetails.name}
        </h3>
        <p
          className="discount-price">
          {productDetails.discount > 0 && <del> ₹{productDetails.price}</del>} ₹
          {productDetails.price - productDetails.discount}
        </p>
        {/* <span className="quantity-btn">
          <button className="decrement-btn" disabled={tempQuantities[tempIndex].quantity === 1}
          onClick={() => handleDecrement(tempIndex)}>-</button>
          { tempQuantities.length > 0 &&
          <input name={`product-${productDetails.id+index}`} key={productDetails.id + index} type="number" 
              value={tempQuantities[tempIndex].quantity} min="1" max="20"
              onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlueEvent(e, tempIndex)}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value),tempIndex)}/>}
          <button className="increment-btn" onClick={() => handleIncrement(tempIndex)}>+</button>
        </span>
        <button
          className="add-to-cart-btn"
          onClick={() => handleCart(productDetails.id, tempQuantities[tempIndex].quantity, tempIndex)}>
          Add to Cart
        </button> */}
      </div>
    </main>
  )
}

export default Product