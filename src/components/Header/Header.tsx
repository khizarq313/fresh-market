import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, updateSearchItems } from "../../features/products/productsSlice";
import CartIcon from "../../assets/icons/Cart";
import "./Header.scss"

type PropsType = {
    setShowCartPage: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<PropsType> = (props) => {

  const { setShowCartPage} = props;  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.products.products);
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => navigate("/"), []);

  useEffect(() => {
    if(searchInput.trim() !== "") {
      const tempArray:ProductType[] = allProducts.filter((product: ProductType) => {
        const tempName: string = product.name.toLowerCase();
        return tempName.includes(searchInput);
      });
      setSearchedProducts([...tempArray]);
      setShowSuggestions(true);
    } else {
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
      navigate("./search-results");
    }
  }

  const openProductPage = function(id: number) {
    setShowSuggestions(false);
    navigate(`./product-${id}`);
  }

  return (
    <header>
      <h1 onClick={() => navigate("/")}>Fresh Market</h1>
      <nav>
        <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
        <button className="nav-btn" onClick={() => navigate("/shop")}>Shop</button>
        <button className="nav-btn" onClick={() => navigate("/about")}>About</button>
        <button className="nav-btn" onClick={() => navigate("/contact")}>Contact</button>
      </nav>
      <div className="search-box">
        <input type="text" value={searchInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => suggestSimilarProducts(e.target.value)}/>
        <button className="search-btn" onClick={searchTheProduct}>search</button>
        <ul>
          { showSuggestions && 
            searchedProducts.map((product: ProductType, index: number) => {
              return (
                <li key={index} onClick={() => openProductPage(product.id)}>
                  {/* <img src={product.image} alt="product-image" /> */}
                  <h1>{product.name}</h1>
                </li>
              )
            })
          }
        </ul>
      </div>
      <button className="login-btn">
        Log in
      </button>
      <button className="cart-btn"  onClick={() => setShowCartPage(true)}>
        <CartIcon />
      </button>
    </header>
  )
}

export default Header