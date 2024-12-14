import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ProductType, updateCart } from "../../features/products/productsSlice";
import Arrow from "../../assets/icons/Arrow";
import "./ProductsList.scss";
import Checked from "../../assets/icons/Checked";
import Cross from "../../assets/icons/Cross";
import Plus from "../../assets/icons/Plus";
import Minus from "../../assets/icons/Minus";

type PropsType = {
    ListName: string,
    PriceRange: number,
    setPriceRange: React.Dispatch<React.SetStateAction<string>>,
    Page: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
    showFilterPage: boolean,
    setShowFilterPage: React.Dispatch<React.SetStateAction<boolean>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setCurrentShopItems: React.Dispatch<React.SetStateAction<string>>,
}

type TempQuantitiesType = {
  id: number,
  quantity: number
}

type AnimationIdList = {
  id: number,
  pulse: boolean,
  tick: boolean
}

const ProductsList: React.FC<PropsType> = (props) => {
    const {ListName, 
      PriceRange, 
      setPriceRange, 
      Page, 
      setCurrentPageHeading, 
      showFilterPage, 
      setShowFilterPage, 
      setCategory, 
      setCurrentShopItems} = props;
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
    const [sortingOrder, setSortingOrder] = useState<string>("Recommended");
    const [sortingClass, setSortingClass] = useState<string>("recommended-order");
    const [productPath, setProductPath] = useState<string>("");
    const [animationIdList, setAnimationIdList] = useState<AnimationIdList[]>([]);
    const totalItems = currentList.reduce((total, product) => total + product.quantity, 0);
    const [closeFilterPageAnimation, setCloseFilterPageAnimation] = useState<boolean>(false);
    const [openDetails, setOpenDetails] = useState<number[]>([1]);
    const [filterPageSort, setFilterPageSort] = useState<string>("Recommended");
    const [filterPageCategory, setFilterPageCategory] = useState<string>("all-items");
    const [rangeValue, setRangeValue] = useState<string>("10");

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
        if(category === "weekly") {
          return (product.discount > 0 && product.price-product.discount < PriceRange)
        } else {
          return (product.category === category && product.price-product.discount < PriceRange)
        }
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
          case "weekly-items":
            tempArray = currentListProducts.filter((product: ProductType) => filterFunction(product, "weekly"));
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
      }, 300);
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
      }, 300);
    }
    
    const scrollDirection = function() {
      if(animateLeft) {
        return "product-card animate-left"
      } else if(animateRight) {
        return "product-card animate-right"
      } else if(Page === "shop" || Page === "search-results") {
        return"shop-product";
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

    const handleCart = (id: number, currentQuantity: number, tempIndex: number) => {
      setAnimationIdList((prevList) => [
        ...prevList,
        { id, pulse: true, tick: false },
      ]);

      setTimeout(() => {
        setAnimationIdList((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, pulse: false, tick: true } : item
          )
        );
      }, 600);
      
      setTimeout(() => {
        setAnimationIdList((prevList) => prevList.filter((item) => item.id !== id));
        dispatch(updateCart({ id, quantity: currentQuantity }));
        tempQuantities[tempIndex].quantity = 1;
      }, 1200);
    };
    
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
      smoothScrollToTop();
    }

    const openPreviousPage = function() {
      setStartLimit(startLimit-16);
      setLastLimit(lastLimit-16);
      setPageNumber(pageNumber-1);
      smoothScrollToTop();
    }

    const sortTheList = function(e: React.FormEvent<HTMLSelectElement>) {
      const type: string = e.currentTarget.value;
      sortingSwitch(type);
    }

    const sortingSwitch = function(type: string) {
      setSortingOrder(type);
      switch (type) {
        case "Recommended":
          setSortingClass("recommended-order");
          break;
        case "Newest":
          setSortingClass("newest-order");
          break;
        case "Price (low to high)":
          setSortingClass("low-to-high-order");
          break;
        case "Price (high to low)":
          setSortingClass("high-to-low-order");
          break;
        case "Name A-Z":
          setSortingClass("a-to-z-order");
          break;
        case "Name Z-A":
          setSortingClass("z-to-a-order");
          break;
      
        default:
          setSortingClass("recommended");
          break;
      }
      setStartLimit(0);
      setLastLimit(15);
      setPageNumber(1);
    }

    const animationOff = function(id: number) {
      return animationIdList.filter((tempProduct: AnimationIdList) => tempProduct.id === id).length !== 1;
    }

    const animationOn = (id: number) => {
      return animationIdList.some((tempProduct) => tempProduct.id === id && tempProduct.pulse);
    };
    
    const tickAnimation = (id: number) => {
      return animationIdList.some((tempProduct) => tempProduct.id === id && tempProduct.tick);
    };

    const closeFilterPage = function() {
      setCloseFilterPageAnimation(true);
      setTimeout(() => {
        setCloseFilterPageAnimation(false);
        setShowFilterPage(false);
        setOpenDetails([1]);
      }, 400)
    }

    const toggleDetailsTag = function(e: React.MouseEvent<HTMLDetailsElement>, n: number) {
      e.preventDefault();
      if(openDetails.includes(n)) {
        setOpenDetails(openDetails.filter((arrItems: number) => n !== arrItems));
      } else {
        setOpenDetails([n, ...openDetails]);
      }
    }

    const applyFilters = function() {
      sortingSwitch(filterPageSort);
      setCurrentShopItems(filterPageCategory);
      switch (filterPageCategory) {
        case "all-items":
          setCategory("All Products");
          break;
        case "bread-items":
          setCategory("Bread & Grains");
          break;
        case "dairy-items":
          setCategory("Dairy & Eggs");
          break;
        case "household-items":
          setCategory("Household Goods");
          break;
        case "produce-items":
          setCategory("Produce");
          break;
        case "weekly-items":
          setCategory("Weekly Deals");
          break;
        default:
          setCategory("All Products");
          break;
      }
      setPriceRange(rangeValue);
      closeFilterPage();
      smoothScrollToTop();
    }

    const clearFilter = function() {
      setFilterPageSort("Recommended");
      sortingSwitch("Recommended");
      setCategory("All Products");
      setFilterPageCategory("all-items");
      setCurrentShopItems("all-items");
      setRangeValue("10");
      setPriceRange("10");
      closeFilterPage();
      smoothScrollToTop();
    }

    const smoothScrollToTop = () => {
      let scrollInterval = setInterval(() => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
          window.scrollBy(0, -50);
        } else {
          clearInterval(scrollInterval);
        }
      }, 10);
    };

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
            <h1 className="quick-deals-heading">Grab 'N Go</h1>
            <h2  className="quick-deals-txt">
              Find amazing deals on a variety of products. Discover new favorites and save on your essentials.
            </h2>
          </>
        }
        { shopPage &&
          <div className="sorting-list">
            <h1>Sort by: </h1>
            <select 
              id="sorting-options" 
              className={sortingClass}
              value={sortingOrder} 
              onChange={(e: React.FormEvent<HTMLSelectElement>) => sortTheList(e)}>
              <option className={sortingOrder === "Recommended" ? "checked-option" : "options"} 
                value="Recommended">Recommended</option>
              <option className={sortingOrder === "Newest" ? "checked-option" : "options"} 
                value="Newest">Newest</option>
              <option className={sortingOrder === "Price (low to high)" ? "checked-option" : "options"} 
                value="Price (low to high)">Price (low to high)</option>
              <option className={sortingOrder === "Price (high to low)" ? "checked-option" : "options"} 
                value="Price (high to low)">Price (high to low)</option>
              <option className={sortingOrder === "Name A-Z" ? "checked-option" : "options"} 
                value="Name A-Z">Name A-Z</option>
              <option className={sortingOrder === "Name Z-A" ? "checked-option" : "options"} 
                value="Name Z-A">Name Z-A</option>
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
          {componentMounted && 
            <div className={`${ListName}-list`}>
              { currentList.length === 0 && <h1 className="no-results">No Results Found!</h1> }
              {currentList.map((product: ProductType, index: number) => {
                const tempIndex:number = tempQuantities.findIndex((tempProduct: TempQuantitiesType) => tempProduct.id === product.id);
                return ( 
                  index >= startLimit && index <= lastLimit &&
                  <div
                    key={index}
                    className={scrollDirection()}>
                    {product.discount > 0 && (
                      <h4 className="discount-tag">Special Price</h4>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      draggable={false}
                      onClick={() => {
                        setCurrentPageHeading(`/${productPath}product-${product.id}`);
                        navigate(`/${productPath}product-${product.id}`)}
                        }/>
                    <h3
                      onClick={() => {
                        setCurrentPageHeading(`/${productPath}product-${product.id}`);
                        navigate(`/${productPath}product-${product.id}`)}
                        }>
                      {product.name}
                    </h3>
                    <p
                      onClick={() => {
                        setCurrentPageHeading(`/${productPath}product-${product.id}`);
                        navigate(`/${productPath}product-${product.id}`)}
                        }>
                      {product.discount > 0 && <del> ₹{product.price}</del>} ₹
                      {product.price - product.discount}
                    </p>
                    <span className="quantity-btn">
                      <button className="decrement-btn" 
                        disabled={animationOn(product.id) || tickAnimation(product.id)}
                        onClick={() => handleDecrement(tempIndex)}>-</button>
                      { tempQuantities.length > 0 &&
                      <input name={`product-${product.id+index}`} 
                        key={product.id + index} 
                        type="number" 
                        readOnly={animationOn(product.id) || tickAnimation(product.id)}
                        value={tempQuantities[tempIndex].quantity} 
                        min="1" 
                        max="20" 
                        className="quantity-input"
                        onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleBackspaceKey(e, tempIndex)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlurEvent(e, tempIndex)}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateItemQuantity(Number(e.target.value),tempIndex)}/>}
                      <button className="increment-btn" 
                        disabled={animationOn(product.id) || tickAnimation(product.id)} 
                        onClick={() => handleIncrement(tempIndex)}>+</button>
                    </span>
                    <button
                      className={`add-to-cart-btn ${animationOn(product.id) ? "pulse" : ""} ${tickAnimation(product.id) ? "tick" : ""}`}
                      onClick={() => handleCart(product.id, tempQuantities[tempIndex].quantity, tempIndex)}
                      disabled={animationOn(product.id) || tickAnimation(product.id)}>
                      {animationOff(product.id) && <>Add to Cart</>}
                      {animationOn(product.id) && <div className="dot-pulse"></div>}
                      {tickAnimation(product.id) && <Checked />}
                    </button>
                    { 
                      shopPage && currentList.length === 0 && 
                      <h1>No results found!</h1>
                    }
                  </div>
                  )})
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
        {shopPage && currentList.length > 15 &&
          <div className="page-control-btns">
            <button disabled={startLimit===0} onClick={openPreviousPage} 
              className="previous-arrow-btn"><Arrow /></button>
            { startLimit!==0 &&
              <button onClick={openPreviousPage}>{pageNumber-1}</button>
            }
            <button><u>{pageNumber}</u></button>
            {currentList.length-1 > lastLimit && 
              <button onClick={openNextPage}>{pageNumber + 1}</button>
            }
            {
              currentList.length-1 > lastLimit+16 && 
              <p>...</p>
            }
            <button disabled={currentList.length-1 <= lastLimit} onClick={openNextPage} 
              className="next-arrow-btn"><Arrow /></button>
          </div>
        }
        {showFilterPage &&
          <section className={closeFilterPageAnimation? "filter-sort-page filter-sort-page-closed": "filter-sort-page"}>
            <div>
              <div className="filter-page-header">
                <span>
                  <h1>Filter & Sort</h1>
                  <p>({totalItems} items)</p>
                </span>
                <button className="cart-close-btn" onClick={closeFilterPage}><Cross /></button>
              </div>
              <details className='filter-details-tag' open={openDetails.includes(1)}>
                <summary onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetailsTag(e, 1)}>
                  <p>Sort by:</p> 
                  {!openDetails.includes(1) && <Plus /> }
                  {openDetails.includes(1) && <Minus /> }
                </summary>
                <input type="radio" id="Recommended" name="Recommended" value="Recommended" 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Recommended"}/>
                <label className="margin-top" htmlFor="Recommended">Recommended</label> <br />
                <input type="radio" id="Newest" name="Newest" value="Newest"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Newest"}/>
                <label className="margin-top" htmlFor="Newest">Newest</label> <br />
                <input type="radio" id="Price (low to high)" name="Price (low to high)" value="Price (low to high)"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Price (low to high)"}/>
                <label className="margin-top" htmlFor="Price (low to high)">Price (low to high)</label> <br />
                <input type="radio" id="Price (high to low)" name="Price (high to low)" value="Price (high to low)"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Price (high to low)"}/>
                <label className="margin-top" htmlFor="Price (high to low)">Price (high to low)</label> <br />
                <input type="radio" id="Name A-Z" name="Name A-Z" value="Name A-Z"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Name A-Z"}/>
                <label className="margin-top" htmlFor="Name A-Z">Name A-Z</label> <br />
                <input type="radio" id="Name Z-A" name="Name Z-A" value="Name Z-A"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageSort(e.currentTarget.value)}
                  checked={filterPageSort === "Name Z-A"}/>
                <label className="margin-top" htmlFor="Name Z-A">Name Z-A</label> <br />
              </details>
              <details className='filter-details-tag' open={openDetails.includes(2)}>
                <summary onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetailsTag(e, 2)}>
                  <p>Category:</p> 
                  {!openDetails.includes(2) && <Plus /> }
                  {openDetails.includes(2) && <Minus /> }
                </summary>
                <input  type="radio" id="all-items" name="all-items" value="all-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "all-items"}/>
                <label className="margin-top" htmlFor="all-items">All Products</label> <br />
                <input type="radio" id="bread-items" name="bread-items" value="bread-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "bread-items"}/>
                <label className="margin-top" htmlFor="bread-items">Bread & Grains</label> <br />
                <input type="radio" id="dairy-items" name="dairy-items" value="dairy-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "dairy-items"}/>
                <label className="margin-top" htmlFor="dairy-items">Dairy & Eggs</label> <br />
                <input type="radio" id="household-items" name="household-items" value="household-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "household-items"}/>
                <label className="margin-top" htmlFor="household-items">Household Goods</label> <br />
                <input type="radio" id="produce-items" name="produce-items" value="produce-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "produce-items"}/>
                <label className="margin-top" htmlFor="produce-items">Produce</label> <br />
                <input type="radio" id="weekly-items" name="weekly-items" value="weekly-items"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPageCategory(e.currentTarget.value)}
                  checked={filterPageCategory === "weekly-items"}/>
                <label className="margin-top" htmlFor="weekly-items">Weekly Deals</label> <br />
              </details>
              <details className='filter-price-slider' open={openDetails.includes(3)}>
                <summary onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetailsTag(e, 3)}>
                  <p>Price:</p> 
                  {!openDetails.includes(3) && <Plus /> }
                  {openDetails.includes(3) && <Minus /> }
                </summary>
                <span className="price-slider margin-top">
                  <input type="range" name="range-btn" id="range-btn" 
                    min="1" max="10" value={rangeValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRangeValue(e.currentTarget.value)}/>
                  <span className="price-range-container">
                    <p>100₹</p>
                    <p>{Number(rangeValue)*100}₹</p>
                  </span>
                </span>
              </details>
            </div>
            <div className="filter-page-footer">
              <button 
                onClick={clearFilter}
                disabled={filterPageSort === "Recommended" && filterPageCategory === "all-items" && rangeValue === "10"}>
                  Clear Filters
              </button>
              <button className="filter-apply-btn" onClick={() => applyFilters()}>Apply</button>
            </div>
          </section>
        }
      </section>
    )
}

export default ProductsList;