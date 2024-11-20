import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import "./Shop.scss"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Minus from "../../assets/icons/Minus";
import Plus from "../../assets/icons/Plus";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  type: string,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const Shop: React.FC<PropsType> = (props) => {
  const {setProgress, type, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  const [showCategoryBtn, setShowCategoryBtn] = useState<boolean>(true);
  const [showRangeBtn, setShowRangeBtn] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [currentShopItems, setCurrentShopItems] = useState<string>("all-items");
  const [currentPage, setCurrentPage] = useState<string>("shop");
  const [rangeValue, setRangeValue] = useState<string>("10");
  
  useEffect(() => {
    if(type === "shop") {
      setCurrentPage("shop");
    } else {
      setCurrentPage("search-results");
    }
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress, type]);

  useEffect(() => {
    if(currentShopItems === "all-items" && Number(rangeValue) === 10) {
      setShowClearBtn(false);
    } else {
      setShowClearBtn(true);
    } 
  }, [currentShopItems, rangeValue])

  const addFilter = function(filterType: string) {
    setCurrentShopItems(`${filterType}-items`);
  }

  const changeRange = function(e: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(e.currentTarget.value);
  }

  const removeFilter = function() {
    setCurrentShopItems("all-items");
    setRangeValue("10");
    setShowClearBtn(false);
  }
  
  return (
    <section className="app-container">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="shop">
        { currentPage === "shop" &&
          <>
            <h1 className="shop-heading">Shop</h1>
            <p className="shop-txt">I'm a paragraph. Click here to add your own text and edit me.</p>
          </>
        }
        { currentPage === "search-results" &&
          <>
            <h1 className="shop-heading">Search Results</h1>
            <p className="shop-txt">I'm a paragraph. Click here to add your own text and edit me.</p>
          </>
        }
        <section className="shop-content">
          <div className="filter-box">
            <h1>Filter by</h1>
            <span className="horizontal-line"></span>
            <button onClick={() => setShowCategoryBtn(!showCategoryBtn)} className="heading-btn">
              <p>Category</p> {!showCategoryBtn && <Plus />}{showCategoryBtn && <Minus />}
            </button>
            { showCategoryBtn && 
              <span className="filter-btns-container">
                <button onClick={() => addFilter("all")} 
                  className={currentShopItems === "all-items"? "current-category" : "optional-category"}>All</button>
                <button onClick={() => addFilter("produce")} 
                  className={currentShopItems === "produce-items"? "current-category" : "optional-category"}>Produce</button>
                <button onClick={() => addFilter("dairy")} 
                  className={currentShopItems === "dairy-items"? "current-category" : "optional-category"}>Dairy & Eggs</button>
                <button onClick={() => addFilter("bread")} 
                  className={currentShopItems === "bread-items"? "current-category" : "optional-category"}>Bread & Grains</button>
                <button onClick={() => addFilter("household")} 
                  className={currentShopItems === "household-items"? "current-category" : "optional-category"}>Household Goods</button>
              </span>
            }
            <span className="horizontal-line"></span>
            <button onClick={() => setShowRangeBtn(!showRangeBtn)} className="heading-btn">
              <p>Price</p> {!showRangeBtn && <Plus />}{showRangeBtn && <Minus />}
            </button>
            { showRangeBtn && 
              <span className="price-slider">
                <input type="range" name="range-btn" id="range-btn" 
                  min="1" max="10" value={rangeValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRange(e)}/>
                <span className="price-range-container">
                  <p>100₹</p>
                  <p>{Number(rangeValue)*100}₹</p>
                </span>
              </span>
            }
            { showClearBtn && 
              <button className="clear-filter-btn" onClick={removeFilter}>Clear Filters X</button>
            }
          </div>
          <ProductsList ListName={currentShopItems} PriceRange={Number(rangeValue)*100} Page={currentPage} setCurrentPageHeading={setCurrentPageHeading}/>
        </section>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
    
  )
}

export default Shop