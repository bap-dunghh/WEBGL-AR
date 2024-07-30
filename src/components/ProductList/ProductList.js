import React from "react";
// import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";
import { configGlobal } from "../../config";

const productItems = configGlobal.products;
const LIST = configGlobal.thumbnails;


const ListSelectModel = ({ setProductItem }) => {
  return (
    <div className="list-select-model">
       <div className="list-select-view">
       {LIST.map((item) => (
        <LazyLoad key={item.index}>
          <div
            className="list-item"
            key={item.index}
            onClick={() => setProductItem(productItems[item.index])}
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
