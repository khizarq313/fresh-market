import React, { useEffect, useState } from 'react';
import Link from '../../assets/icons/Link';
import LinkedIn from '../../assets/icons/LinkedIn';
import Facebook from '../../assets/icons/Facebook';
import Twitter from '../../assets/icons/Twitter';
import "./FAQ.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    currentPageHeading: string,
    setCurrentPageHeading: React.Dispatch<React.SetStateAction<string>>,
    setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>,
}

const FAQ: React.FC<PropsType>  = (props) => {  
    
    const {setProgress, currentPageHeading, setCurrentPageHeading, setShowCartPage} = props;
    const [isGeneral, setIsGeneral] = useState<boolean>(true);
    const [openDetails, setOpenDetails] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
          setProgress(100);
        }, 1000)
      }, [setProgress]);

    const toggleDetails = function(e: React.MouseEvent<HTMLDetailsElement>, n: number) {
        e.preventDefault();
        if(openDetails === n) {
            setIsOpen(!isOpen);
        } else {
            setOpenDetails(n);
            setIsOpen(true);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }

    const openGeneral = function() {
        setIsGeneral(true);
        setIsOpen(true);
        setOpenDetails(1);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }

    const openSettingUpFAQs = function() {
        setIsGeneral(false);
        setIsOpen(true);
        setOpenDetails(4);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }

  return (
    <section className='faq'>
        <Header 
        currentPageHeading={currentPageHeading} 
        setCurrentPageHeading={setCurrentPageHeading} 
        setShowCartPage={setShowCartPage} />
        <main className='faq-content'>
            <h1>Frequently Asked Questions</h1>
            <span className='faq-nav-btns'>
                <button onClick={openGeneral} className={isGeneral? "current-faq-btn" : "normal-faq-btn"}>General</button>
                <button onClick={openSettingUpFAQs}  className={!isGeneral? "current-faq-btn" : "normal-faq-btn"}>Order & Support</button>
            </span>
            {isGeneral &&
                <div className='faq-container'>
                    <details className='styled' open={openDetails === 1 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 1)}>
                        <summary>What is Fresh Market?</summary>
                        <p>Fresh Market is an online grocery store offering a wide variety of fresh fruits, vegetables, and household essentials, delivered directly to your door.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                    <details className='styled' open={openDetails === 2 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 2)}>
                        <summary>What delivery options do you offer?</summary>
                        <p>We offer same-day delivery and scheduled delivery options, ensuring your orders arrive when it's most convenient for you.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                    <details className='styled' open={openDetails === 3 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 3)}>
                        <summary>Do you offer returns or exchanges?</summary>
                        <p>Yes, we offer returns and exchanges for damaged or incorrect items. Please refer to our Return & Exchange policy for further instructions.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                </div>
            }
            {!isGeneral &&
                <div className='faq-container'>
                    <details className='styled' open={openDetails === 4 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 4)}>
                        <summary>How do I place an order?</summary>
                        <p>To place an order, follow these steps: <br />
                            1. Browse our product categories or use the search bar to find what you need. <br />
                            2. Add your desired items to the cart by clicking "Add to Cart". <br />
                            3. Review your cart and make sure everything is correct. <br />
                            4. Proceed to checkout, enter your shipping details, and choose a payment method. <br />
                            5. Complete your purchase by clicking "Place Order".</p>
                        <p>Your order will be processed, and you'll receive a confirmation email with details.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                    <details className='styled' open={openDetails === 5 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 5)}>
                        <summary>How do I track my order?</summary>
                        <p>To track your order, follow these steps: <br />
                            1. Once your order is shipped, you will receive a tracking number via email. <br />
                            2. Go to the courier's website or use the provided tracking link. <br />
                            3. Enter the tracking number to view the status of your delivery. <br />
                            4. You can also check the delivery status in your Fresh Market account under "Order History".</p>
                        <p>Feel free to reach out to our support team if you need assistance with tracking your order.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                    <details className='styled' open={openDetails === 6 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 6)}>
                        <summary>Can I modify or cancel my order after placing it?</summary>
                        <p>Once an order is shipped, it cannot be modified or canceled. <br />
                        If you have an urgent issue or need assistance, please contact our customer support team as soon as possible, and we will do our best to assist you.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                    <details className='styled' open={openDetails === 7 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 7)}>
                        <summary>What should I do if I receive a damaged or expired item?</summary>
                        <p>If you receive a damaged or expired item, follow these steps: <br />
                            1. Contact our customer support immediately with your order details. <br />
                            2. Provide a photo of the damaged or expired item. <br />
                            3. Our support team will assist you with a quick resolution, such as a refund or replacement.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <span className='faq-horizontal-line'></span>
                </div>
            }
        </main>
        <Footer 
        currentPageHeading={currentPageHeading} 
        setCurrentPageHeading={setCurrentPageHeading} />
    </section>
  )
}

export default FAQ