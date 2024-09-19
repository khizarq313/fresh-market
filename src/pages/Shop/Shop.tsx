import React, { useEffect } from "react";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const Shop: React.FC<PropsType> = (props) => {
  const {setProgress} = props;
  
  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <main>Shop</main>
  )
}

export default Shop