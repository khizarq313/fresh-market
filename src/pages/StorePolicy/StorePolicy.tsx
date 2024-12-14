import React, { useEffect } from 'react'
import "./StorePolicy.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    currentPageHeading: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
    setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const StorePolicy: React.FC<PropsType>  = (props) => {  
    
    const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;

    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
          setProgress(100);
        }, 1000)
      }, [setProgress]);

  return (
    <section className='store-policy'>
        <Header 
        currentPageHeading={currentPageHeading} 
        setCurrentPageHeading={setCurrentPageHeading} 
        setShowCartPage={setShowCartPage} 
        />
        <main className='store-policy-content'>
            <h1>Store Policy</h1>
            <section>
                <h1>Customer Care</h1>
                <p>At Fresh Market, we prioritize excellent customer service. If you have any questions or need assistance, our friendly customer care team is here to help. Whether it's about your order, product information, or any concerns, we're just a message or call away! We strive to resolve issues promptly and ensure your shopping experience is as smooth as possible. Your satisfaction is our top priority, and we're committed to providing the best support every step of the way.</p>
            </section>
            <section>
                <h1>Wholesale Inquiries</h1>
                <p>If you're interested in purchasing Fresh Market products in bulk, we offer wholesale opportunities to businesses and retailers. Whether you're looking to stock up on fresh produce, household essentials, or other food items, we are here to help you with customized wholesale solutions.For more details or to discuss pricing and terms, please contact our wholesale team. We look forward to partnering with you and providing high-quality products for your business.</p>
            </section>
            <section>
                <h1>Privacy & Safety</h1>
                <p>At Fresh Market, your privacy and safety are our top priorities. We use secure methods to protect your personal information and ensure safe transactions. All data is kept confidential and is only used to process your orders and improve your shopping experience.We follow strict privacy protocols and comply with all regulations to safeguard your details. You can shop with confidence, knowing that your information is in safe hands.</p>
            </section>
            <section>
                <h1>Payment Methods</h1>
                <p><strong>Credit / Debit Cards</strong> - We accept all major credit and debit cards for quick and secure payments.</p>
                <p><strong>PAYPAL</strong> - Use PayPal for seamless, safe, and fast transactions.</p>
                <p><strong>Offline Payments</strong> - We also provide offline payment options for those who prefer to pay in person.</p>
            </section>
        </main>
        <Footer 
        currentPageHeading={currentPageHeading} 
        setCurrentPageHeading={setCurrentPageHeading} 
      />
    </section>
  )
}

export default StorePolicy