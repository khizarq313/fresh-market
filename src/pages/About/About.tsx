import React, { useEffect } from "react";
import { Banner4 } from "../../assets/images/All-Images";
import "./About.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  currentPageHeading: string,
  setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const About: React.FC<PropsType> = (props) => {  
  
  const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  return (
    <section className="about">
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className="about-content">
        <h1>About Our Market</h1>
        <img src={Banner4} alt="store-img" draggable={false}/>
        <p>Fresh Market is your trusted destination for the finest quality fruits, vegetables, and household essentials. Our mission is to bring fresh, healthy, and affordable products straight to your home, ensuring convenience and care every step of the way.</p>
        <p>We take pride in our dedicated team and our commitment to exceptional service. Fresh Market was founded with a passion for making fresh and wholesome food accessible to everyone. What sets us apart is our focus on quality, sustainability, and customer satisfaction. Welcome to a market that truly cares about you and your family!</p>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default About