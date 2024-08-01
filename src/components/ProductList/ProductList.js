import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";
import { configGlobal } from "../../config";

const productItems = configGlobal.products;
const LIST = configGlobal.thumbnails;

const ListSelectModel = ({ setProductItem }) => {
  const navigate = useNavigate();

  const handleClick = (itemIndex) => {
    setProductItem(productItems[itemIndex]);
    navigate(`/?item=${itemIndex+1}`);
  };

  return (
    <div className="list-select-model">
      <div className="list-select-view">
        {LIST.map((item) => (
          <LazyLoad key={item.index}>
            <div
              className="list-item"
              key={item.index}
              onClick={() => handleClick(item.index)}
            >
              <img src={item.src} alt={item.alt} />
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

const ProductList = () => {
  const [productItem, setProductItem] = React.useState(productItems[0]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get('item');
    if (itemId !== null && productItems[itemId]) {
      setProductItem(productItems[itemId]);
    }
  }, [location.search]);

  return (
    <>
      <section className="">
        <LazyLoad key={productItem.id}>
          <ModelViewer item={productItem} />
        </LazyLoad>
      </section>
      <section className="list-select">
        <ListSelectModel setProductItem={setProductItem} />
      </section>
    </>
  );
};

export default ProductList;
