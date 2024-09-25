import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import "./ProductsList.scss";

type PropsType = {
    ListName: string,
    PriceRange: number 
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

const ProductsList: React.FC<PropsType> = (props) => {
    const {ListName, PriceRange} = props;
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
    const [shopPage, setShopPage] = useState<boolean>(false);
    const [startLimit, setStartLimit] = useState<number>(0);
    const [lastLimit, setLastLimit] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [sortingOrder, setSortingOrder] = useState<string>("default");
    const [productPath, setProductPath] = useState<string>("");

    useEffect(() => {
      setStartLimit(0);
      setLastLimit(0);
      setPageNumber(1);
    }, [ListName, PriceRange]);

    useEffect(() => {
      const filterFunction = function(product: ProductType, category: string) {
        return (product.category === category && product.price-product.discount < PriceRange)
      }
      switch(ListName) {
        case "discount-products":
          setCurrentList(products.filter((product: ProductType) => product.discount > 0));
          setLastLimit(Infinity);
          setProductPath("");
          break;
          case "quick-deals":
            setCurrentList([...products]);
            setLastLimit(7);
            setProductPath("");
            break;
          case "all-items":
            setCurrentList(products.filter((product: ProductType) => (product.price-product.discount < PriceRange)));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "produce-items":
            setCurrentList(products.filter((product: ProductType) => filterFunction(product, "produce")));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "dairy-items":
            setCurrentList(products.filter((product: ProductType) => filterFunction(product, "dairy-eggs")));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "bread-items":
            setCurrentList(products.filter((product: ProductType) => filterFunction(product, "bread-grains")));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "household-items":
            setCurrentList(products.filter((product: ProductType) => filterFunction(product, "household")));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
        default:
          setCurrentList([]);
          break;
      }
    }, [ListName, PriceRange, startLimit, products]);

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

    const handleBlurEvent = function(e: React.FocusEvent<HTMLInputElement>, tempIndex: number) {
      if(e.target.value === "") {
        e.target.value = "1";
      }
    }

    const openNextPage = function() {
      setStartLimit(startLimit+16);
      setLastLimit(lastLimit+16);
      setPageNumber(pageNumber+1);
    }

    const openPreviousPage = function() {
      setStartLimit(startLimit-16);
      setLastLimit(lastLimit-16);
      setPageNumber(pageNumber-1);
    }

    const sortTheList = function(e: React.FormEvent<HTMLSelectElement>) {
      const type: string = e.currentTarget.value;
      if(sortingOrder !== type) {
        setSortingOrder(type);
        switch(type) {
          case "Sort by":
            break;
          case "Newest":
            currentList.reverse();
            break;
          case "Price (low to high)":
            currentList.sort((a,b) => ((a.price-a.discount) - (b.price-b.discount)));
            break;
          case "Price (high to low)":
            currentList.sort((a,b) => ((b.price-b.discount) - (a.price-a.discount) ));
            break;
          case "Name A-Z":
            currentList.sort((a,b) => (a.name.localeCompare(b.name)));
            break;
          case "Name Z-A":
            currentList.sort((a,b) => (b.name.localeCompare(a.name)));
            break;
          default:
            break;
        }
      }
    }

    return (
      <section className={ListName}>
        { !shopPage && 
          <>
            <h1>Exciting Offers</h1>
            <h2>
              Find amazing deals on a variety of products. Discover new favorites and save on your essentials.
            </h2>
          </>
        }
        { shopPage &&
          <div>
            <select id="sorting-options" onChange={(e: React.FormEvent<HTMLSelectElement>) => sortTheList(e)}>
              <option value="Sort by">Sort by</option>
              <option value="Newest">Newest</option>
              <option value="Price (low to high)">Price (low to high)</option>
              <option value="Price (high to low)">Price (high to low)</option>
              <option value="Name A-Z">Name A-Z</option>
              <option value="Name Z-A">Name Z-A</option>
            </select>
          </div>
        }
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
                index >= startLimit && index <= lastLimit && 
                <div key={index} className={scrollDirection()}>
                {product.discount > 0 && (
                  <h4 className="discount-tag">Special Price</h4>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  onClick={() => navigate(`/${productPath}product-${product.id}`)}/>
                <h3
                  className="product-name"
                  onClick={() => navigate(`/${productPath}product-${product.id}`)}>
                  {product.name}
                </h3>
                <p
                  className="discount-price"
                  onClick={() => navigate(`/${productPath}product-${product.id}`)}>
                  {product.discount > 0 && <del> ₹{product.price}</del>} ₹
                  {product.price - product.discount}
                </p>
                <span className="quantity-btn">
                  <button className="decrement-btn" disabled={tempQuantities[tempIndex].quantity === 1}
                  onClick={() => handleDecrement(tempIndex)}>-</button>
                  { tempQuantities.length > 0 &&
                  <input name={`product-${product.id+index}`} key={product.id + index} type="number" 
                      value={tempQuantities[tempIndex].quantity} min="1" max="20" className="quantity-input"
                      onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlurEvent(e, tempIndex)}
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
        {shopPage && 
          <div>
            <button disabled={startLimit===0} onClick={openPreviousPage}>Previous</button>
            { startLimit!==0 &&
              <button onClick={openPreviousPage}>{pageNumber-1}</button>
            }
            <h1>{pageNumber}</h1>
            {currentList.length-1 > lastLimit && 
              <button onClick={openNextPage}>{pageNumber + 1}</button>
            }
            {
              currentList.length-1 > lastLimit+16 && 
              <p>...</p>
            }
            <button disabled={currentList.length-1 <= lastLimit} onClick={openNextPage}>Next</button>
          </div>
        }
      </section>
    )
}

export default ProductsList;