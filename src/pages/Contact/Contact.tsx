import React, { useEffect } from "react";
import "./Contact.scss"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const Contact: React.FC<PropsType> = (props) => {

  const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  const submitUserMessage = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="contact">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="contact-content">
        <h1>Contact Us</h1>
        <p className="contact-description">I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. </p>
        <div className="contact-details">
          <span>
            <h2>CONTACT</h2>
            <p>Tel: 123-456-7890</p>
            <p>Email: info@mysite.com</p>
          </span>
          <span>
            <h2>ADDRESS</h2>
            <p>500 Terry Francine Street</p>
            <p>San Francisco, CA 94158</p>
          </span>
          <span>
            <h2>OPENING HOURS</h2>
            <p>Mon - Fri: 7am - 10pm</p>
            <p>Saturday: 8am - 10pm</p>
            <p>Sunday: 8am - 11pm</p>
          </span>
        </div>
        <form onSubmit={submitUserMessage} className="contact-form">
          <span>
            <label htmlFor="first-name">First name*</label>
            <label htmlFor="last-name" className="last-name">Last name*</label>
          </span>
          <span>
            <input type="text" id="first-name" required/>
            <label htmlFor="last-name" className="last-name-mobile">Last name*</label>
            <input type="text" id="last-name" required/>
          </span>
          <span>
            <label htmlFor="contact-email">Email*</label>
            <label htmlFor="subject" className="subject">Subject</label>
          </span>
          <span>
            <input type="text" id="contact-email" required/>
            <label htmlFor="subject" className="subject-mobile">Subject</label>
            <input type="text" id="subject" />
          </span>
          <span>
            <label htmlFor="message">Type your message here...</label>
          </span>
          <textarea id="message"/>
          <span className="submit-btn">
            <button type="submit">Submit</button>
          </span>
        </form>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default Contact