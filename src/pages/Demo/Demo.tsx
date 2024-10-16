import React, { useEffect } from 'react';
import "./Demo.scss";
import { useNavigate } from 'react-router-dom';
import Wrong from '../../assets/icons/Wrong';

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
        <button className='close-btn' onClick={closeDemoPage}><Wrong /></button>
        <h1>Demo Mode</h1>
        <p>This is just a demo version</p>
        <button className='ok-btn' onClick={closeDemoPage}>OK</button>
    </main>
  )
}

export default Demo