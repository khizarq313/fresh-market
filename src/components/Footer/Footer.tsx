import React from "react";
import facebookIcon from "../../assets/icons/facebook-icon.webp";
import instagramIcon from "../../assets/icons/instagram-icon.webp";
import youtubeIcon from "../../assets/icons/youtube-icon.webp";
import "./Footer.scss"
import { useNavigate } from "react-router-dom";

type PropsType = {
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
}

const Footer: React.FC<PropsType> = (props) => {
  const {currentPageHeading, setCurrentPageHeading} = props;
  const navigate = useNavigate();

  const subscribeEmail = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const openThePage = function(pageName: string) {
    if(pageName !== currentPageHeading) {
      navigate(pageName);
      setCurrentPageHeading(pageName);
    }
  }

  return (
    <footer>
      <section className="additional-links">
        <div className="store-nav-btns">
          <h1>STORE</h1>
          <button onClick={() => openThePage("/shop")}>Shop All</button>
          <button onClick={() => openThePage("/shipping-and-returns")}>Shipping & Returns</button>
          <button onClick={() => openThePage("/store-policy")}>Store Policy</button>
          <button onClick={() => openThePage("/faq")}>FAQ</button>
        </div>
        <div className="">
          <h1>ADDRESS</h1>
          <p>500 Terry Francine Street <br />San Francisco, CA 94158</p>
        </div>
        <div className="">
          <h1>OPENING HOURS</h1>
          <p>Mon - Fri: 7am - 10pm</p>
          <p>Saturday: 8am - 10pm</p>
          <p>Sunday: 8am - 11pm</p>
        </div>
        <form className="" onSubmit={subscribeEmail}>
          <h1>GET IT FRESH</h1>
          <label htmlFor="email-input">Email*</label>
          <input type="mail" id="email-input" required/>
          <span className="subscribe-toggle">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Yes, subscribe me to your newsletter.</label>
          </span>
          <button type="submit">SUBSCRIBE NOW</button>
        </form>
      </section>
      <div className="contact-links">
        <button className="contact-btn">
            <img src={youtubeIcon} alt="" />
        </button>
        <button className="contact-btn">
          <img src={instagramIcon} alt="" />
        </button>
        <button className="contact-btn">
          <img src={facebookIcon} alt="" />
        </button>
      </div>
    </footer>
  )
}

export default Footer