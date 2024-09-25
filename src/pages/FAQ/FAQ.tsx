import React, { useEffect, useState } from 'react';
import Link from '../../assets/icons/Link';
import LinkedIn from '../../assets/icons/LinkedIn';
import Facebook from '../../assets/icons/Facebook';
import Twitter from '../../assets/icons/Twitter';
import "./FAQ.scss"

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>
}

const FAQ: React.FC<PropsType>  = (props) => {  
    
    const {setProgress} = props;
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
        }
    }

    const openGeneral = function() {
        setIsGeneral(true);
        setIsOpen(true);
        setOpenDetails(1);
    }

    const openSettingUpFAQs = function() {
        setIsGeneral(false);
        setIsOpen(true);
        setOpenDetails(4);
    }

  return (
    <main className='faq'>
        <h1>Frequently Asked Questions</h1>
        <section>
            <h1>Frequently asked questions</h1>
            <span>
                <button onClick={openGeneral}>General</button>
                <button onClick={openSettingUpFAQs}>Setting up FAQs</button>
            </span>
            {isGeneral &&
                <div>
                    <details className='styled' open={openDetails === 1 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 1)}>
                        <summary>What is an FAQ section?</summary>
                        <p>An FAQ section can be used to quickly answer common questions about your business like "Where do you ship to?", "What are your opening hours?", or "How can I book a service?".</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <details className='styled' open={openDetails === 2 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 2)}>
                        <summary>Why do FAQs matter?</summary>
                        <p>FAQs are a great way to help site visitors find quick answers to common questions about your business and create a better navigation experience.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <details className='styled' open={openDetails === 3 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 3)}>
                        <summary>Where can I add my FAQs?</summary>
                        <p>FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                </div>
            }
            {!isGeneral &&
                <div>
                    <details className='styled' open={openDetails === 4 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 4)}>
                        <summary>How do I add a new question & answer?</summary>
                        <p>To add a new FAQ follow these steps:</p>
                        <p>1. Manage FAQs from your site dashboard or in the Editor</p>
                        <p>2. Add a new question & answer</p>
                        <p>3. Assign your FAQ to a category</p>
                        <p>4. Save and publish.</p>
                        <p>You can always come back and edit your FAQs.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <details className='styled' open={openDetails === 5 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 5)}>
                        <summary>Can I insert an image, video, or GIF in my FAQ?</summary>
                        <p>Yes. To add media follow these steps:</p>
                        <p>1. Manage FAQs from your site dashboard or in the Editor</p>
                        <p>2. Create a new FAQ or edit an existing one</p>
                        <p>3. From the answer text box click on the video, image or GIF icon</p>
                        <p>4. Add media from your library and save.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                    <details className='styled' open={openDetails === 6 && isOpen} 
                    onClick={(e: React.MouseEvent<HTMLDetailsElement>) => toggleDetails(e, 6)}>
                        <summary>How do I edit or remove the 'Frequently Asked Questions' title?</summary>
                        <p>You can edit the title from the FAQ 'Settings' tab in the Editor. <br />To remove the title from your mobile app go to the 'Site & App' tab in your Owner's app and customize.</p>
                        <span>
                            <Facebook />
                            <Twitter /> 
                            <LinkedIn />
                            <Link />
                        </span>
                    </details>
                </div>
            }
        </section>
    </main>
  )
}

export default FAQ