import React, { useEffect, useState } from "react";

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const Shop: React.FC<PropsType> = (props) => {
  const {setProgress} = props;
  const [showCategoryBtn, setShowCategoryBtn] = useState<boolean>(false);
  const [showRangeBtn, setShowRangeBtn] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);

  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);
  
  return (
    <main className="shop">
      <h1>Shop</h1>
      <p>I'm a paragraph. Click here to add your own text and edit me.</p>
      <div className="filter-box">
        <h1>Filter by</h1>
        <hr />
        <button onClick={() => setShowCategoryBtn(!showCategoryBtn)}>Category</button>
        { showCategoryBtn && 
          <span>
            <button>All</button>
            <button>Produce</button>
            <button>Dairy & Eggs</button>
            <button>Bread & Grains</button>
            <button>Household Goods</button>
          </span>
        }
        <hr />
        <button onClick={() => setShowRangeBtn(!showRangeBtn)}>Price</button>
        { showRangeBtn && 
          <span>
            <input type="range" name="range-btn" id="range-btn" />
          </span>
        }
        { showClearBtn && 
          <button>Clear Filter</button>
        }
      </div>
    </main>
  )
}

export default Shop