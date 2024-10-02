import React, { useEffect } from 'react';
import "./Demo.scss";
import { useNavigate } from 'react-router-dom';

type PropsType = {
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    type: string,
    currentPageHeading: string,
}

const Demo: React.FC<PropsType> = (props) => {

    const {setProgress, type, currentPageHeading} = props;
    const navigate = useNavigate();

    useEffect(() => {
        setProgress(70);
        setTimeout(() => {
            setProgress(100);
        }, 1000)
    }, [setProgress]);

    const closeDemoPage = function() {
        if(type === "normal") {
            navigate(currentPageHeading);
        } else {
            navigate("/cart");
        }
    }

    
  return (
    <main className='demo-page'>
        <button className='close-btn' onClick={closeDemoPage}>close</button>
        <h1>Demo Mode</h1>
        <button className='ok-btn' onClick={closeDemoPage}>OK</button>
    </main>
  )
}

export default Demo