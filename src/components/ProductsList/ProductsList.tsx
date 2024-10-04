import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import Arrow from "../../assets/icons/Arrow";
import "./ProductsList.scss";

type PropsType = {
    ListName: string,
    PriceRange: number,
    Page: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

const ProductsList: React.FC<PropsType> = (props) => {
    const {ListName, PriceRange, Page, setCurrentPageHeading} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProducts = useSelector((state: RootState) => state.products);
    const products: ProductType[] = allProducts.products;
    const [currentListProducts, setCurrentListProducts] = useState<ProductType[]>([]);
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
    const [sortingOrder, setSortingOrder] = useState<string>("Sort by");
    const [productPath, setProductPath] = useState<string>("");

    useEffect(() => {
      if(Page === "search-results") {
        setCurrentListProducts([...allProducts.searchProducts]);
      } else {
        setCurrentListProducts([...products]);
      }
    },[Page, allProducts.searchProducts, products])

    useEffect(() => {
      setStartLimit(0);
      setLastLimit(0);
      setPageNumber(1);
    }, [ListName, PriceRange]);

    useEffect(() => {
      const filterFunction = function(product: ProductType, category: string) {
        return (product.category === category && product.price-product.discount < PriceRange)
      }
      let tempArray: ProductType[] = [];
      switch(ListName) {
        case "discount-products":
          tempArray = currentListProducts.filter((product: ProductType) => product.discount > 0);
          setLastLimit(Infinity);
          setProductPath("");
          break;
          case "quick-deals":
            tempArray = [...currentListProducts];
            setLastLimit(7);
            setProductPath("");
            break;
          case "all-items":
            tempArray = currentListProducts.filter((product: ProductType) => (product.price-product.discount < PriceRange));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "produce-items":
            tempArray = currentListProducts.filter((product: ProductType) => filterFunction(product, "produce"));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "dairy-items":
            tempArray = currentListProducts.filter((product: ProductType) => filterFunction(product, "dairy-eggs"));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "bread-items":
            tempArray = currentListProducts.filter((product: ProductType) => filterFunction(product, "bread-grains"));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
          case "household-items":
            tempArray = currentListProducts.filter((product: ProductType) => filterFunction(product, "household"));
            setLastLimit(startLimit+15);
            setShopPage(true);
            setProductPath("shop/");
            break;
        default:
          tempArray = currentListProducts.slice();
          break;
      }
      switch(sortingOrder) {
        case "Sort by":
          setCurrentList(tempArray.slice());
          break;
        case "Newest":
          setCurrentList(tempArray.reverse());
          break;
        case "Price (low to high)":
          setCurrentList(tempArray.sort((a,b) => ((a.price-a.discount) - (b.price-b.discount))));
          break;
        case "Price (high to low)":
          setCurrentList(tempArray.sort((a,b) => ((b.price-b.discount) - (a.price-a.discount) )));
          break;
        case "Name A-Z":
          setCurrentList(tempArray.sort((a,b) => (a.name.localeCompare(b.name))));
          break;
        case "Name Z-A":
          setCurrentList(tempArray.sort((a,b) => (b.name.localeCompare(a.name))));
          break;
        default:
          setCurrentList(tempArray.slice());
          break;
      }
    }, [ListName, PriceRange, products, currentListProducts, startLimit, sortingOrder]);

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
      setSortingOrder(type);
      setStartLimit(0);
      setLastLimit(15);
      setPageNumber(1);
    }

    return (
      <section className={ListName}>
        { !shopPage && ListName === "discount-products" &&
          <>
            <h1 className="discount-products-heading">Exciting Offers</h1>
            <h2  className="discount-products-txt">
              Find amazing deals on a variety of products. Discover new favorites and save on your essentials.
            </h2>
          </>
        }

        { !shopPage && ListName === "quick-deals" &&
          <>
            <h1 className="quick-deals-heading">Exciting Offers</h1>
            <h2  className="quick-deals-txt">
              Find amazing deals on a variety of products. Discover new favorites and save on your essentials.
            </h2>
          </>
        }
        { shopPage &&
          <div>
            <select id="sorting-options" value={sortingOrder} onChange={(e: React.FormEvent<HTMLSelectElement>) => sortTheList(e)}>
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
            <button className="left-arrow-btn" disabled={animateLeft} onClick={scrollLeft}>
              <Arrow />
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
                  onClick={() => {
                    setCurrentPageHeading(`/${productPath}product-${product.id}`);
                    navigate(`/${productPath}product-${product.id}`)}
                    }/>
                <h3
                  className="product-name"
                  onClick={() => {
                    setCurrentPageHeading(`/${productPath}product-${product.id}`);
                    navigate(`/${productPath}product-${product.id}`)}
                    }>
                  {product.name}
                </h3>
                <p
                  className="discount-price"
                  onClick={() => {
                    setCurrentPageHeading(`/${productPath}product-${product.id}`);
                    navigate(`/${productPath}product-${product.id}`)}
                    }>
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
            { 
              shopPage && currentList.length === 0 && 
              <h1>No results found!</h1>
            }
          </div>
          }
          {
            ListName === "discount-products" && 
            <button className="right-arrow-btn" disabled={animateRight} onClick={scrollRight}>
              <Arrow />
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
        {
          ListName === "discount-products" &&
          <span className="end-line"> </span>
        }
      </section>
    )
}

export default ProductsList;