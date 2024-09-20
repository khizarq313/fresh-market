import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import "./Shop.scss"

type PropsType = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const Shop: React.FC<PropsType> = (props) => {
  const {setProgress} = props;
  const [showCategoryBtn, setShowCategoryBtn] = useState<boolean>(false);
  const [showRangeBtn, setShowRangeBtn] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [currentShopItems, setCurrentShopItems] = useState<string>("all-items");
  const [rangeValue, setRangeValue] = useState<string>("10");

  useEffect(() => {
    setProgress(70);
    setTimeout(() => {
      setProgress(100);
    }, 1000)
  }, [setProgress]);

  const addFilter = function(filterType: string) {
    setCurrentShopItems(`${filterType}-items`);
    if(filterType === "all" && Number(rangeValue) === 10) {
      setShowClearBtn(false);
    } else {
      setShowClearBtn(true);
    }
  }

  const changeRange = function(e: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(e.currentTarget.value);
    if(Number(rangeValue) >= 9) {
      setShowClearBtn(true);
    } else if(Number(rangeValue) === 10 && currentShopItems === "all-items") {
      setShowClearBtn(false);
    }
  }

  const removeFilter = function() {
    setCurrentShopItems("all-items");
    setRangeValue("10");
    setShowClearBtn(false);
  }
  
  return (
    <main className="shop">
      <h1>Shop</h1>
      <p>I'm a paragraph. Click here to add your own text and edit me.</p>
      <section className="shop-content">
        <div className="filter-box">
          <h1>Filter by</h1>
          <hr />
          <button onClick={() => setShowCategoryBtn(!showCategoryBtn)}>Category</button>
          { showCategoryBtn && 
            <span>
              <button onClick={() => addFilter("all")}>All</button>
              <button onClick={() => addFilter("produce")}>Produce</button>
              <button onClick={() => addFilter("dairy")}>Dairy & Eggs</button>
              <button onClick={() => addFilter("bread")}>Bread & Grains</button>
              <button onClick={() => addFilter("household")}>Household Goods</button>
            </span>
          }
          <hr />
          <button onClick={() => setShowRangeBtn(!showRangeBtn)}>Price</button>
          { showRangeBtn && 
            <span>
              <input type="range" name="range-btn" id="range-btn" 
                min="1" max="10" value={rangeValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRange(e)}/>
              <p>{Number(rangeValue)*100}</p>
            </span>
          }
          { showClearBtn && 
            <button onClick={removeFilter}>Clear Filter</button>
          }
        </div>
        <ProductsList ListName={currentShopItems} PriceRange={Number(rangeValue)*100}/>
      </section>
    </main>
  )
}

export default Shop