import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import "./Shop.scss"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Minus from "../../assets/icons/Minus";
import Plus from "../../assets/icons/Plus";
import { ShopBanner } from "../../assets/images/All-Images";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Search from "../../assets/icons/Search";
import Clear from "../../assets/icons/Clear";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  type: string,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const Shop: React.FC<PropsType> = (props) => {
  const {setProgress, type, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  const searchInput = useSelector((state: RootState) => state.products.searchInput);
  const [showCategoryBtn, setShowCategoryBtn] = useState<boolean>(true);
  const [showRangeBtn, setShowRangeBtn] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [searchInputText, setSearchInputText] = useState<string>(searchInput);
  const [currentShopItems, setCurrentShopItems] = useState<string>("all-items");
  const [pageHeading, setPageHeading] = useState<string>("All Products");
  const [currentPage, setCurrentPage] = useState<string>("shop");
  const [rangeValue, setRangeValue] = useState<string>("10");
  const [sliderValue, setSliderValue] = useState<number>(100);
  const [showFilterPage, setShowFilterPage] = useState<boolean>(false);
  
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
  }, [currentShopItems, rangeValue]);

  const addFilter = function(filterType: string) {
    smoothScrollToTop();
    setCurrentShopItems(`${filterType}-items`);
    switch (filterType) {
      case "all":
        setPageHeading("All Products");
        break;
      case "bread":
        setPageHeading("Bread & Grains");
        break;
      case "dairy":
        setPageHeading("Dairy & Eggs");
        break;
      case "household":
        setPageHeading("Household Goods");
        break;
      case "produce":
        setPageHeading("Produce");
        break;
      case "weekly":
        setPageHeading("Weekly Deals");
        break;
      default:
        setPageHeading("All Products");
        break;
    }
  }

  const changeRange = function(e: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(e.currentTarget.value);
    setSliderValue(Number(e.currentTarget.value)*10);
    smoothScrollToTop();
  }

  const removeFilter = function() {
    setCurrentShopItems("all-items");
    setPageHeading("All Products");
    setRangeValue("10");
    setSliderValue(100);
    setShowClearBtn(false);
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
    <section className="app-container">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="shop">
        <div className="filter-box">
          <h1>Browse by</h1>
          <span className="horizontal-line"></span>
            <button onClick={() => setShowCategoryBtn(!showCategoryBtn)} className="heading-btn">
              <p>Category</p> {!showCategoryBtn && <Plus />}{showCategoryBtn && <Minus />}
            </button>
          { showCategoryBtn && 
            <span className="filter-btns-container">
              <button onClick={() => addFilter("all")} 
                className={currentShopItems === "all-items"? "current-category" : "optional-category"}>
                  All Products
              </button>
              <button onClick={() => addFilter("bread")} 
                className={currentShopItems === "bread-items"? "current-category" : "optional-category"}>
                  Bread & Grains
              </button>
              <button onClick={() => addFilter("dairy")} 
                className={currentShopItems === "dairy-items"? "current-category" : "optional-category"}>
                  Dairy & Eggs
              </button>
              <button onClick={() => addFilter("household")} 
                className={currentShopItems === "household-items"? "current-category" : "optional-category"}>
                  Household Goods
              </button>
              <button onClick={() => addFilter("produce")} 
                className={currentShopItems === "produce-items"? "current-category" : "optional-category"}>
                  Produce
              </button>
              <button onClick={() => addFilter("weekly")} 
                className={currentShopItems === "weekly-items"? "current-category" : "optional-category"}>
                  Weekly Deals
              </button>
            </span>
          }
          <h1 className="filter-by-heading">Filter by</h1>
          <span className="horizontal-line"></span>
          <button onClick={() => setShowRangeBtn(!showRangeBtn)} className="heading-btn">
            <p>Price</p> {!showRangeBtn && <Plus />}{showRangeBtn && <Minus />}
          </button>
          { showRangeBtn && 
            <span className="price-slider">
              <input type="range" name="range-btn" id="range-btn" className="slider-range"
                style={{'--slider-value': `${sliderValue}%` as string,} as React.CSSProperties}
                min="1" max="10" value={rangeValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRange(e)}/>
              <span className="price-range-container">
                <p>100₹</p>
                <p>{Number(rangeValue)*100}₹</p>
              </span>
            </span>
          }
          <span className="horizontal-line"></span>
          { showClearBtn && 
            <button className="clear-filter-btn" onClick={removeFilter}><u>Clear Filters</u></button>
          }
        </div>
        <section className="shop-content">
          { currentPage === "search-results" &&
            <>
              <span className="shop-search-box">
                <input 
                  className="shop-search-input-feild"
                  type="text" 
                  value={searchInputText} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInputText(e.target.value)}
                  placeholder="Search..." 
                  />
                <span>
                  { searchInputText !== "" && <button className="shop-clear-search-btn" onClick={() => setSearchInputText("")}><Clear /></button> }
                  <button className="search-btn" onClick={() => console.log()}><Search /></button>
                </span>
              </span>
              <h1 className="shop-search-heading">Search Results for: <i>{searchInput}</i></h1>
            </>
          }
          { currentPage === "shop" &&
              <img src={ShopBanner} alt="banner-1" className="shop-banner"/>
          }
          <h1 className="shop-heading">{pageHeading}</h1>
          <p className="shop-txt">Explore our wide range of fresh and high-quality products in this category, carefully selected to meet your daily needs and ensure the best for your family.</p>
          <span className="filter-sort-btn-container">
            <button className="filter-sort-btn" onClick={() => setShowFilterPage(true)}><u>Filter & Sort</u></button>
          </span>
          <ProductsList 
            ListName={currentShopItems} 
            PriceRange={Number(rangeValue)*100} 
            setPriceRange={setRangeValue}
            Page={currentPage} 
            setCurrentPageHeading={setCurrentPageHeading}
            showFilterPage={showFilterPage}
            setShowFilterPage={setShowFilterPage}
            setCategory={setPageHeading}
            setCurrentShopItems={setCurrentShopItems}/>
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