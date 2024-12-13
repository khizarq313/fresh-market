import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, updateSearchInput, updateSearchItems } from "../../features/products/productsSlice";
import CartIcon from "../../assets/icons/Cart";
import Logo from "../../assets/icons/Logo";
import Search from "../../assets/icons/Search";
import Profile from "../../assets/icons/Profile";
import Clear from "../../assets/icons/Clear";
import "./Header.scss"
import { AnimatePresence, motion } from "framer-motion";
import Arrow from "../../assets/icons/Arrow";

type PropsType = {
    setShowCartPage: Dispatch<SetStateAction<boolean>>,
    currentPageHeading: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
}

const Header: React.FC<PropsType> = (props) => {

  const { setShowCartPage, currentPageHeading, setCurrentPageHeading} = props;  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.products.products);
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showTrendingProducts, setShowTrendingProducts] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      const tempArray: ProductType[] = allProducts.filter((product: ProductType) => {
        const tempName: string = product.name.toLowerCase();
        return tempName.includes(searchInput.toLowerCase());
      });
      const sortedArray = tempArray.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const searchTerm = searchInput.toLowerCase();
        const aStartsWith = aName.startsWith(searchTerm);
        const bStartsWith = bName.startsWith(searchTerm);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return aName.localeCompare(bName);
      });
      setSearchedProducts(sortedArray);
      setShowSuggestions(true);
    } 
     else {
      setSearchedProducts([]);
      setShowSuggestions(false);
    }
  },[allProducts, searchInput]);

  const suggestSimilarProducts = function(tempSearchInput: string) {
    setSearchInput(tempSearchInput.toLowerCase());
  }

  const updateSearchValue = function(tempSearchInput: string) {
    suggestSimilarProducts(tempSearchInput);
  }

  const searchTheProduct = function(eventType: string) {
    if(eventType === "onClick") {
      if(searchInput !== "") {
        dispatch(updateSearchInput({searchedInput: searchInput}));
        dispatch(updateSearchItems({searchedProducts: searchedProducts}));
        setShowSuggestions(false);
        setCurrentPageHeading("/shop");
        navigate("/search-results");
        setShowTrendingProducts(false);
        setShowSearchPanel(false);
        clearSearchInput();
      }
    } else if(eventType === "onBlur") {
      clearSearchInput();
    }
  }

  const openProductPage = function(id: number) {
    setShowSuggestions(false);
    setCurrentPageHeading(`/product-${id}`);
    navigate(`/product-${id}`);
  }
  
  const openThePage = function(pageName: string) {
    if(pageName !== currentPageHeading) {
      if(pageName !== "/demo-page"){
        setCurrentPageHeading(pageName);
        setTimeout(() => {
          navigate(pageName);
        }, 300);
      } else {
        setCurrentPageHeading(currentPageHeading);
        setTimeout(() => {
          navigate(pageName);
        }, 300);
      }
    }
  }

  const checkTheKey = function(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.nativeEvent.key === "Enter"){
      searchTheProduct("onClick");
    }
  }

  const openSearchPage = function() {
    setShowSearchPanel(true);
  }

  const closeSearchPage = function() {
    setShowSearchPanel(false);
  }

  const clearSearchTxt = function() {
    dispatch(updateSearchInput({searchedInput: ""}));
    clearSearchInput();
  }

  const clearSearchInput = function() {
    setSearchInput("");
    setShowTrendingProducts(false);
  }

  return (
    <header>
      <span className="logo">
        <Logo />
        <h1 onClick={() => openThePage("/")}>Fresh Market</h1>
      </span>
      <nav className="nav-btn-container">
        <button className={currentPageHeading === "/" ? "nav-btn current-panel" : "nav-btn"} onClick={() => openThePage("/")}>Home</button>
        <button className={currentPageHeading === "/shop" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/shop")}>Shop</button>
        <button className={currentPageHeading === "/about" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/about")}>About</button>
        <button className={currentPageHeading === "/contact" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/contact")}>Contact</button>
      </nav>
      <div className="search-box">
        <span className={showSuggestions||showTrendingProducts? "expand-search-input": "search-input"}>
          <input 
            className="search-input-feild"
            type="text" 
            value={searchInput} 
            placeholder="Search..." 
            onFocus={() => setShowTrendingProducts(true)}
            onBlur={() => searchTheProduct("onBlur")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => suggestSimilarProducts(e.target.value)}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => checkTheKey(e)}/>
          {
            showSuggestions && <button className="clear-search-btn" onMouseDown={clearSearchInput}> <Clear /> </button>
          }
          <button className="search-btn" onMouseDown={() => searchTheProduct("onClick")}><Search /></button>
        </span>
        {
          showTrendingProducts && 
          <ul className="search-results-list">
            { searchedProducts.length === 0 && !showSuggestions &&
              <h1 className="search-heading">Trending Products</h1>
            }
            {searchedProducts.length === 0 && !showSuggestions && allProducts.slice(0, 10).map((product: ProductType, index: number) => {
              return (
                  <li key={index} onMouseDown={() => openProductPage(product.id)} className="searched-items">
                      <span className="search-img-container">
                          <img src={product.image} alt="product-image" draggable={false}/>
                      </span>
                      <span className="search-text-container">
                        <h1>{product.name}</h1>
                        <h2>{product.description}</h2>
                      </span>
                  </li>
              );
            })}
          </ul>
        }
        { showSuggestions && 
          <ul className="search-results-list">
            {searchedProducts.length === 0 && 
              <div>
                <h3 className="search-not-found">Product not found.</h3>
                <span className="clear-search-txt">
                  <button onMouseDown={clearSearchInput}>Clear Search <Clear /></button>
                </span>
              </div>  
            }
            {searchedProducts.length > 0 && 
              <h1 className="search-heading">Products</h1>
            }
            {searchedProducts.map((product: ProductType, index: number) => {
              return (
                <li key={index} onMouseDown={() => openProductPage(product.id)} className="searched-items">
                  <span className="search-img-container">
                    <img src={product.image} alt="product-image" draggable={false}/>
                  </span>
                    <span className="search-text-container">
                        <h1>{product.name}</h1>
                        <h2>{product.description}</h2>
                    </span>
                </li>
              )
            })}
          </ul>
        }
      </div>
      <button className={showSuggestions||showTrendingProducts? "hide-login": "login-btn"} onClick={() => openThePage("/demo-page")}>
        <Profile />
        Log in
      </button>
      <button className="cart-btn"  onClick={() => setShowCartPage(true)}>
          <CartIcon />
      </button>
      <button
          className="more-options-btn"
          onClick={() => setShowMoreOptions(!showMoreOptions)}>
          <div className="menu-icon">
            <motion.span
              className="line"
              animate={{
                rotate: showMoreOptions ? 45 : 0,
                y: showMoreOptions ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}/>
            <motion.span
              className="line"
              animate={{
                opacity: showMoreOptions ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}/>
            <motion.span
              className="line"
              animate={{
                rotate: showMoreOptions ? -45 : 0,
                y: showMoreOptions ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}/>
          </div>
      </button>
      <AnimatePresence>
        { showMoreOptions && 
        <motion.div
          className="nav-btn-page"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }} 
          transition={{duration: 0.4}}>
          <button className="option-login-btn" onClick={() => openThePage("/demo-page")}>
            <Profile />
            Log in
          </button>
          <div className="option-nav">
        <button className={currentPageHeading === "/" ? "current-panel" : ""} onClick={() => openThePage("/")}>Home</button>
        <button className={currentPageHeading === "/shop" ? "current-panel" : ""}  onClick={() => openThePage("/shop")}>Shop</button>
        <button className={currentPageHeading === "/about" ? "current-panel" : ""}  onClick={() => openThePage("/about")}>About</button>
        <button className={currentPageHeading === "/contact" ? "current-panel" : ""}  onClick={() => openThePage("/contact")}>Contact</button>
          </div>
        </motion.div>
        }
      </AnimatePresence>
      <span className="mobile-search-input">
        <input 
          className="search-input-feild"
          type="text"
          value={searchInput}
          placeholder="Search..."
          onChange={() => console.log("searching")} 
          onFocus={openSearchPage}/>
        <button className="search-btn" onClick={() => searchTheProduct("onClick")}><Search /></button>
      </span>
      <AnimatePresence>
        { showSearchPanel && 
        <motion.div
          className="search-page"
          initial={{opacity: 0 }}
          animate={{opacity: 1 }}
          exit={{opacity: 0 }} 
          transition={{duration: 0.4}}>
          <button onClick={closeSearchPage} className="search-page-back-btn"><Arrow /></button>
          <span className="search-input-box">
            <button className="search-btn"><Search /></button>
            <input 
              className="search-input-feild"
              type="text" 
              value={searchInput} 
              placeholder="Search..." 
              autoFocus={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSearchValue(e.target.value)}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => checkTheKey(e)}
              />
            {
              showSuggestions && <button className="mobile-clear-search-btn" onClick={clearSearchTxt}> <Clear /> </button>
            }
          </span>
          {
            showSearchPanel && !showSuggestions &&
            <ul className="mobile-search-results-list">
              { searchedProducts.length === 0 &&
                <h1 className="search-heading">Trending Products</h1>
              }
              {searchedProducts.length === 0 && !showSuggestions && allProducts.slice(0, 4).map((product: ProductType, index: number) => {
                return (
                    <li key={index} onMouseDown={() => openProductPage(product.id)} className="searched-items">
                        <span className="search-img-container">
                            <img src={product.image} alt="product-image" draggable={false}/>
                        </span>
                        <span className="mobile-search-text-container">
                          <h2>{product.name}</h2>
                          <h3>{product.description}</h3>
                        </span>
                    </li>
                );
              })}
            </ul>
          }
          { showSuggestions && 
            <ul className="mobile-search-results-list">
              {searchedProducts.length === 0 && 
                <div>
                  <h3 className="search-not-found">Product not found.</h3>
                  <span className="clear-search-txt">
                    <button onClick={clearSearchTxt}>Clear Search <Clear /></button>
                  </span>
                </div>  
              }
              {searchedProducts.length > 0 && 
                <h1 className="search-heading">Products</h1>
              }
              {searchedProducts.map((product: ProductType, index: number) => {
                return (
                  index <=3 && 
                    <li key={index} onMouseDown={() => openProductPage(product.id)} className="searched-items">
                      <span className="search-img-container">
                        <img src={product.image} alt="product-image" draggable={false}/>
                      </span>
                      <span className="mobile-search-text-container">
                          <h2>{product.name}</h2>
                          <h3>{product.description}</h3>
                      </span>
                    </li>
                )
              })}
              { searchInput !== "" &&
                <button className="mobile-search-page-btn" onClick={() => searchTheProduct("onClick")}>Search all "{searchInput}"</button>
              }
            </ul>
            }
        </motion.div>
        }
      </AnimatePresence>
    </header>
  )
}

export default Header