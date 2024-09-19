import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import "./ProductsList.scss";

type PropsType = {
    ListName: string
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

const ProductsList: React.FC<PropsType> = (props) => {
    const {ListName} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProducts = useSelector((state: RootState) => state.products);
    const products: ProductType[] = allProducts.products;
    const [currentList, setCurrentList] = useState<ProductType[]>([]);
    const [tempQuantities, setTempQuantities] = useState<TempQuantitiesType[]>([]);
    const [animateLeft, setAnimateLeft] = useState<boolean>(false);
    const [animateRight, setAnimateRight] = useState<boolean>(false);
    const [componentMounted, setComponentMounted] = useState<boolean>(false);
    const [updateValues, setUpdateValues] = useState<boolean>(true);
    
    useEffect(() => {
      switch(ListName) {
        case "discount-products":
          setCurrentList(products.filter((product: ProductType) => product.discount > 0));
          break;
          case "quick-deals":
            setCurrentList(products.slice(0, 8));
            break;
        default:
          setCurrentList([]);
          break;
      }
    }, [ListName, products]);

    useEffect(() => {
      if(updateValues) {
        const tempQuantitiesArray = products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        }));
        setTempQuantities(tempQuantitiesArray);
        if(tempQuantities.length >= 1) {
          setComponentMounted(true);
        }
      }
    }, [products, tempQuantities.length, updateValues]);

    const scrollRight = function() {
      setUpdateValues(false);
      setAnimateRight(true);
      const [firstProduct, ...restProducts] = currentList;
      setCurrentList([...currentList, firstProduct]);   
      setTimeout(() => {
        setAnimateRight(false);
        setCurrentList([...restProducts, firstProduct])
      }, 400);
    }

    const scrollLeft = function() { 
      setUpdateValues(false);
      setAnimateLeft(true);
      const lastProduct = currentList[currentList.length - 1];
      const restProducts = currentList.slice(0, currentList.length - 1);
      const newcurrentList = [lastProduct, ...restProducts];
      setCurrentList(newcurrentList);
      setTimeout(() => {
        setAnimateLeft(false);
      }, 400);
    }
    
    const scrollDirection = function() {
      if(animateLeft) {
        return "product-card animate-left"
      } else if(animateRight) {
        return "product-card animate-right"
      } else {
        return "product-card"
      }
    }

    const handleIncrement = function(tempIndex: number) {
      setUpdateValues(false);
      const updatedQuantity = {
        id: tempQuantities[tempIndex].id,
        quantity: tempQuantities[tempIndex].quantity + 1
      }
      tempQuantities.filter((quantity:TempQuantitiesType) => (quantity.id !== tempQuantities[tempIndex].id))
      setTempQuantities([updatedQuantity, ...tempQuantities]);
    }

    const handleDecrement = function(tempIndex: number) {
      setUpdateValues(false);
      const updatedQuantity = {
        id: tempQuantities[tempIndex].id,
        quantity: tempQuantities[tempIndex].quantity - 1
      }
      tempQuantities.filter((quantity:TempQuantitiesType) => (quantity.id !== tempQuantities[tempIndex].id))
      setTempQuantities([updatedQuantity, ...tempQuantities]);
    }

    const handleCart = function(id: number, currentQuantity: number, tempIndex: number) {
      dispatch(updateCart({ id: id, quantity: currentQuantity }));
      tempQuantities[tempIndex].quantity = 1;
    }


    const updateItemQuantity = function(currentQuantity:number ,tempIndex: number) {
      if(currentQuantity < 1) {
        setUpdateValues(false);
        const updatedQuantity = {
          id: tempQuantities[tempIndex].id,
          quantity: 1
        }
        tempQuantities.filter((quantity:TempQuantitiesType) => (quantity.id !== tempQuantities[tempIndex].id));
        setTempQuantities([updatedQuantity, ...tempQuantities]);
      } else if(currentQuantity > 20) {
        setUpdateValues(false);
        const updatedQuantity = {
          id: tempQuantities[tempIndex].id,
          quantity: 20
        }
        tempQuantities.filter((quantity:TempQuantitiesType) => (quantity.id !== tempQuantities[tempIndex].id));
        setTempQuantities([updatedQuantity, ...tempQuantities]);
      } else {
        setUpdateValues(false);
        const updatedQuantity = {
          id: tempQuantities[tempIndex].id,
          quantity: currentQuantity
        }
        tempQuantities.filter((quantity:TempQuantitiesType) => (quantity.id !== tempQuantities[tempIndex].id));
        setTempQuantities([updatedQuantity, ...tempQuantities]);
      }
    }

    const handleBackspaceKey = function(e:React.KeyboardEvent<HTMLInputElement>, tempIndex: number) {
      if(e.key === "Backspace" && e.target instanceof HTMLInputElement && Number(e.target.value) < 10) {
          e.target.value = "";
      }
    }

    const handleBlueEvent = function(e: React.FocusEvent<HTMLInputElement>, tempIndex: number) {
      if(e.target.value === "") {
        e.target.value = "1";
      }
    }


    return (
      <section className={ListName}>
        <h1>Exciting Offers</h1>
        <h2>
          Find amazing deals on a variety of products. Discover new favorites and save on your essentials.
        </h2>
        <div className={`${ListName}-container`}>
          {
            ListName === "discount-products" && 
            <button className="scroll-left-btn" disabled={animateLeft} onClick={scrollLeft}>
              left
            </button>
          }
          {componentMounted && <div className={`${ListName}-list`}>
            {currentList.map((product: ProductType, index: number) => {
              const tempIndex:number = tempQuantities.findIndex((tempProduct: TempQuantitiesType) => tempProduct.id === product.id);
              return (
                <div key={index} className={scrollDirection()}>
                  {product.discount > 0 && (
                    <h4 className="discount-tag">Special Price</h4>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onClick={() => navigate(`/product-${product.id}`)}/>
                  <h3
                    className="product-name"
                    onClick={() => navigate(`/product-${product.id}`)}>
                    {product.name}
                  </h3>
                  <p
                    className="discount-price"
                    onClick={() => navigate(`/product-${product.id}`)}>
                    {product.discount > 0 && <del> ₹{product.price}</del>} ₹
                    {product.price - product.discount}
                  </p>
                  <span className="quantity-btn">
                    <button className="decrement-btn" disabled={tempQuantities[tempIndex].quantity === 1}
                    onClick={() => handleDecrement(tempIndex)}>-</button>
                    { tempQuantities.length > 0 &&
                    <input name={`product-${product.id+index}`} key={product.id + index} type="number" 
                        value={tempQuantities[tempIndex].quantity} min="1" max="20"
                        onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlueEvent(e, tempIndex)}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value),tempIndex)}/>}
                    <button className="increment-btn" onClick={() => handleIncrement(tempIndex)}>+</button>
                  </span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleCart(product.id, tempQuantities[tempIndex].quantity, tempIndex)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
          }
          {
            ListName === "discount-products" && 
            <button className="scroll-right-btn" disabled={animateRight} onClick={scrollRight}>
              right
            </button>
          }
        </div>
      </section>
    )
}

export default ProductsList;