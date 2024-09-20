import React, { useEffect } from "react";
import { Banner4 } from "../../assets/images/All-Images";
import "./About.scss";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const About: React.FC<PropsType> = (props) => {  
  
  const {setProgress} = props;
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  return (
    <main className="about">
      <h1>About Our Market</h1>
      <img src={Banner4} alt="store-img" />
      <p>I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story and let your users know a little more about you.</p>
      <p>This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.</p>
    </main>
  )
}

export default About