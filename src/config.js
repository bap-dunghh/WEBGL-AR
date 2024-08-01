import loadModels, { loadThumbnails } from "./utils/loadModels";

const middlewareProducts = (products, arrayConfig) => {
  return products.map((product) => {
    const config =
      arrayConfig.find((config) => config.name === product.name) || {};
    return {
      ...product,
      showDetails: config.showDetails !== undefined ? config.showDetails : true,
      showAR: config.showAR !== undefined ? config.showAR : true,
      rating: config.rating !== undefined ? config.rating : 3,
      price: config.price !== undefined ? config.price : 1000,
    };
  });
};

const arrayConfigProduct = [
  { name: "Shoes 01", showAR: true, rating: 5, price: 2000 },
  { name: "Shoes 02", showAR: false, rating: 4, price: 1500 },
  { name: "Shoes 03", showAR: true, rating: 3, price: 1000 },
  { name: "Shoes 04", showAR: false, rating: 2, price: 500 },
  { name: "Shoes 05", showAR: false, rating: 2, price: 500 },
];

export const configGlobal = {
  modelViewer: {
    arScale: "auto", // auto or fixed, fixed luôn để model kích thước 100% trong AR
  },
  control: {
    show: false,
    options: {
      showBackgroundColor: false,
      backgroundColor: "#ecf0f3",
      showBrightness: false,
      brightness: 1,
      showShadowIntensity: false,
      shadowIntensity: 1,
      showZoom: false,
      zoom: 1,
    },
  },
  products: middlewareProducts(loadModels(), arrayConfigProduct),
  thumbnails: loadThumbnails(),
};

export const metaConfig = {
  title: "AR-Demo",
};
