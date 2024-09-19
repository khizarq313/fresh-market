import React, { useEffect } from "react";
import "./Contact.scss"

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const Contact: React.FC<PropsType> = (props) => {

  const {setProgress} = props;
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitUserMessage = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="contact">
      <h1>Contact Us</h1>
      <p>I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. </p>
      <hr className="contact-hr"/>
      <div className="contact-details">
        <span>
          <h1>CONTACT</h1>
          <p>Tel: 123-456-7890</p>
          <p>Email: info@mysite.com</p>
        </span>
        <span>
          <h1>ADDRESS</h1>
          <p>500 Terry Francine Street</p>
          <p>San Francisco, CA 94158</p>
        </span>
        <span>
          <h1>OPENING HOURS</h1>
          <p>Mon - Fri: 7am - 10pm</p>
          <p>Saturday: 8am - 10pm</p>
          <p>Sunday: 8am - 11pm</p>
        </span>
      </div>
      <form onSubmit={submitUserMessage}>
          <label htmlFor="first-name">First name*</label>
          <input type="text" id="first-name" required/>
          <label htmlFor="last-name">Last name*</label>
          <input type="text" id="last-name" required/>
          <label htmlFor="contact-email">Email*</label>
          <input type="text" id="contact-email" required/>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" />
          <label htmlFor="message">Type your message here...</label>
          <textarea id="message"/>
          <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default Contact