import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, updateSearchItems } from "../../features/products/productsSlice";
import CartIcon from "../../assets/icons/Cart";
import Logo from "../../assets/icons/Logo";
import Search from "../../assets/icons/Search";
import Profile from "../../assets/icons/Profile";
import Clear from "../../assets/icons/Clear";
import "./Header.scss"

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
  },[allProducts, searchInput])

  const suggestSimilarProducts = function(tempSearchInput: string) {
    setSearchInput(tempSearchInput.toLowerCase());
  }

  const searchTheProduct = function() {
    if(searchInput !== "") {
      dispatch(updateSearchItems({searchedProducts: searchedProducts}));
      setShowSuggestions(false);
      setCurrentPageHeading("/shop");
      navigate("/search-results");
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

  const clearSearchInput = function() {
    setSearchInput("");
  }

  return (
    <header>
      <span className="logo">
        <Logo />
        <h1 onClick={() => openThePage("/")}>Fresh Market</h1>
      </span>
      <nav>
        <button className={currentPageHeading === "/" ? "nav-btn current-panel" : "nav-btn"} onClick={() => openThePage("/")}>Home</button>
        <button className={currentPageHeading === "/shop" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/shop")}>Shop</button>
        <button className={currentPageHeading === "/about" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/about")}>About</button>
        <button className={currentPageHeading === "/contact" ? "nav-btn current-panel" : "nav-btn"}  onClick={() => openThePage("/contact")}>Contact</button>
      </nav>
      <div className="search-box">
        <span className="search-input">
          <input type="text" value={searchInput} placeholder="Search..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => suggestSimilarProducts(e.target.value)}/>
          {
            showSuggestions && <button className="clear-search-btn" onClick={clearSearchInput}> <Clear /> </button>
          }
          <button className="search-btn" onClick={searchTheProduct}><Search /></button>
        </span>
        { showSuggestions && 
          <ul className="search-results-list">
            {searchedProducts.length > 0 && 
              <h1>Products</h1>
            }
            {searchedProducts.map((product: ProductType, index: number) => {
              return (
                <li key={index} onClick={() => openProductPage(product.id)}>
                  <img src={product.image} alt="product-image" />
                  <h1>{product.name}</h1>
                </li>
              )
            })}
          </ul>
        }
      </div>
      <div>
      <button className="login-btn" onClick={() => openThePage("/demo-page")}>
        <Profile />
        Log in
      </button>
      </div>
      <button className="cart-btn"  onClick={() => setShowCartPage(true)}>
        <CartIcon />
      </button>
    </header>
  )
}

export default Header