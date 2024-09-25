import React, { useEffect } from 'react'
import "./ShippingAndReturns.scss"

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>
}

const ShippingAndReturns: React.FC<PropsType>  = (props) => {  
    
    const {setProgress} = props;
  
    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
            setProgress(100);
        }, 1000)
    }, [setProgress]);

  return (
    <main className='shipping-returns'>
        <h1>Shipping & Returns</h1>
        <section>
            <h1>Shipping Policy</h1>
            <p>I'm a shipping policy section. I'm a great place to update your customers about your shipping methods, packaging and costs. Use plain, straightforward language to build trust and make sure that your customers stay loyal! I'm the second paragraph in your shipping policy section. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add details about your policy and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you.</p>
        </section>
        <section>
            <h1>Return & Exchange Policy</h1>
            <p>I'm a return policy section. I'm a great place to let your customers know what to do in case they've changed their mind about their purchase, or if they're dissatisfied with a product. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence. I'm the second paragraph in your Return & Exchange policy. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add details about your policy and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you.</p>
        </section>
    </main>
  )
}

export default ShippingAndReturns