import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";
import { configGlobal } from "../../config";
import fileSizes from "../../fileSizes.json"; // Import fileSizes.json từ src

const productItems = configGlobal.products;
const LIST = configGlobal.thumbnails;

const getContentLength = async (url) => {
  const response = await fetch(`${url}?_=${new Date().getTime()}`, {
    method: "HEAD",
  });
  return parseInt(response.headers.get("Content-Length"));
};

const ListSelectModel = ({ setProductItem, fileSizeErrors, isLoading }) => {
  const navigate = useNavigate();

  const handleClick = (itemIndex) => {
    setProductItem(productItems[itemIndex]);
    navigate(`/?item=${itemIndex + 1}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list-select-model">
      <div className="list-select-view">
        {LIST.map((item, index) => (
          <LazyLoad key={index}>
            <div
              className="list-item"
              key={index}
              onClick={() => handleClick(index)}
            >
              {fileSizeErrors[index] ? (
                <div className="error">Error</div>
              ) : (
                <img src={item.src} alt={item.alt} />
              )}
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

const ProductList = () => {
  const [productItem, setProductItem] = useState(productItems[0]);
  const [fileSizeErrors, setFileSizeErrors] = useState([]);
  const [fileSizeErrorModel, setFileSizeErrorModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(false);
  const [initialFileSizes, setInitialFileSizes] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get("item");
    if (itemId !== null && productItems[itemId - 1]) {
      setProductItem(productItems[itemId - 1]);
    }
  }, [location.search]);

  useEffect(() => {
    console.log("fileSizes", fileSizes);
    setInitialFileSizes(fileSizes);
  }, []);

  useEffect(() => {
    const fetchThumbnailSizes = async () => {
      try {
        const currentSizes = {};
        const thumbnailFiles = require.context(
          "../../assets/thumbnails",
          false,
          /\.png$/
        );

        await Promise.all(
          thumbnailFiles.keys().map(async (key) => {
            const filePath = thumbnailFiles(key);
            const fileName = filePath.split("/").pop().split(".")[0] + ".png";
            currentSizes[fileName] = await getContentLength(filePath);
          })
        );

        const errors = LIST.map((item) => {
          const thumbnailFile =
            item.src.split("/").pop().split(".")[0] + ".png";
          return (
            initialFileSizes?.thumbnails[thumbnailFile] !==
            currentSizes[thumbnailFile]
          );
        });

        setFileSizeErrors(errors);
      } catch (error) {
        console.error("Error fetching thumbnail sizes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (initialFileSizes) {
      fetchThumbnailSizes();
    }
  }, [initialFileSizes]);

  const isIos =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    const fetchModelSize = async () => {
      setModelLoading(true);
      try {
        const currentSizes = {};
        const modelFiles = require.context(
          "../../assets/models",
          false,
          /\.(glb|usdz)$/
        );

        let modelFile;
        if (isIos && productItem.iOSSrc) {
          modelFile =
            productItem.iOSSrc.split("/").pop().split(".")[0] + ".usdz";
        } else {
          modelFile =
            productItem.modelSrc.split("/").pop().split(".")[0] + ".glb";
        }

        const filePath = modelFiles(`./${modelFile}`);
        const size = await getContentLength(filePath);
        currentSizes[modelFile] = size;
        const sizeMatch =
          initialFileSizes.models[modelFile] === currentSizes[modelFile];

        setFileSizeErrorModel(!sizeMatch);
      } catch (error) {
        console.error("Error fetching model size:", error);
      } finally {
        setModelLoading(false);
      }
    };

    if (productItem && initialFileSizes) {
      fetchModelSize();
    }
  }, [productItem, initialFileSizes]);
  return (
    <>
      <section className="">
        {modelLoading ? (
          <div>Loading...</div>
        ) : (
          <LazyLoad key={productItem.id}>
            {fileSizeErrorModel ? (
              <div className="error">Error</div>
            ) : (
              <ModelViewer item={productItem} />
            )}
          </LazyLoad>
        )}
      </section>
      <section className="list-select">
        <ListSelectModel
          setProductItem={setProductItem}
          fileSizeErrors={fileSizeErrors}
          isLoading={isLoading}
        />
      </section>
    </>
  );
};

export default ProductList;
