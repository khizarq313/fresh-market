import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartIcon from "../../assets/icons/Cart";
import "./Header.scss"

type PropsType = {
    setShowCartPage: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<PropsType> = (props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => navigate("/"), []);
  const { setShowCartPage} = props;  const navigate = useNavigate();

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
        <input type="text" />
        <button className="search-btn"></button>
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