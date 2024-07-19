import React from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";
import shoes_01 from "../../assets/thumbnails/1.png";
import shoes_02 from "../../assets/thumbnails/2.png";
import shoes_03 from "../../assets/thumbnails/3.png";
import shoes_04 from "../../assets/thumbnails/4.png";

const LIST = [
  {
    src: shoes_01,
    alt: "Shoes 01",
    index: 0,
  },
  {
    src: shoes_02,
    alt: "Shoes 02",
    index: 1,
  },
  {
    src: shoes_03,
    alt: "Shoes 03",
    index: 2,
  },
  {
    src: shoes_04,
    alt: "Shoes 04",
    index: 3,
  },
];

const ListSelectModel = ({ setProductItem }) => {
  return (
    <div className="list-select-model">
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
