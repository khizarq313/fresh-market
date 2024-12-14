import React, { useEffect } from 'react'
import "./ShippingAndReturns.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    currentPageHeading: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
    setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const ShippingAndReturns: React.FC<PropsType>  = (props) => {  
    
    const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
  
    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
          setProgress(100);
        }, 1000)
      }, [setProgress]);

  return (
    <section className='shipping-returns'>
      <Header 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      setShowCartPage={setShowCartPage} 
      />
      <main className='shipping-returns-content'>
          <h1>Shipping & Returns</h1>
          <section>
              <h1>Shipping Policy</h1>
              <p>We offer reliable shipping methods to ensure your orders arrive fresh and on time. All products are carefully packaged to maintain their quality during transit. Shipping costs and delivery times may vary depending on your location and selected shipping option.We are committed to transparency and customer satisfaction. For detailed information on shipping rates and delivery timelines, please refer to your order confirmation or contact our support team.</p>
          </section>
          <section>
              <h1>Return & Exchange Policy</h1>
              <p>Your satisfaction is our priority. If you're not completely happy with your purchase or have received a defective item, we offer a hassle-free return or exchange process. Products must be returned in their original condition within the specified return period.For further assistance or to initiate a return or exchange, reach out to our support team. We're here to ensure your shopping experience is smooth and worry-free!</p>
          </section>
      </main>
      <Footer 
      currentPageHeading={currentPageHeading} 
      setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default ShippingAndReturns