import loadModels, { loadThumbnails } from "./utils/loadModels";

const middlewareProducts = (products, arrayConfig) => {
  return products.map(product => {
    const config = arrayConfig.find(config => config.name === product.name) || {};
    return {
      ...product,
      showDetails: config.showDetails !== undefined ? config.showDetails : true,
      showAR: config.showAR !== undefined ? config.showAR : true,
      rating: config.rating !== undefined ? config.rating : 3,
      price: config.price !== undefined ? config.price : 1000
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
    show: true,
    options: {
      // Background color
      showBackgroundColor: true, // Show/Hide Background color control
      defaultBackgroundColor: "#ecf0f3", // Hex color
      // Brightness
      showBrightness: true, // Show/Hide Brightness control
      defaultBrightness: 1, // Range: 0-2 (0.1 step)
      minBrightness: "0.1",
      maxBrightness: "2",
      stepBrightness: "0.1",
      // Shadow Intensity
      showShadowIntensity: true, // Show/Hide Shadow Intensity control
      defaultShadowIntensity: 1, // Range: 0-2 (0.1 step)
      minShadowIntensity: "0",
      maxShadowIntensity: "2",
      stepShadowIntensity: "0.1",
      // Zoom
      showZoom: true, // Show/Hide Zoom control
      defaultZoom: 1, // Range: 0.5-3 (0.1 step)
      minZoom: "0.5",
      maxZoom: "3",
      stepZoom: "0.1",
    },
  },
  products: middlewareProducts(loadModels(), arrayConfigProduct),
  thumbnails: loadThumbnails(),
};

export const metaConfig = {
  // Content web
  title: "AR-Demo",
  description: "Demo thôi à!",
  keywords: "photorealistic, 3d, digital, augmented reality, website",
  ogTitle: "AR-Demo",
  ogDescription: "Demo thôi, ko có UI gì đẹp đâu",
  ogImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fquantrimang.com%2Fkhoa-hoc%2Fchuot-lang-nuoc-192274&psig=AOvVaw1VmUvc9OuvJ8wonZzFHEDY&ust=1721727987890000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjCv96uuocDFQAAAAAdAAAAABAJ",
  ogUrl: "https://AR-Demo.netlify.app/",
  ogSiteName: "AR-Demo",
  ogVideo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fquantrimang.com%2Fkhoa-hoc%2Fchuot-lang-nuoc-192274&psig=AOvVaw1VmUvc9OuvJ8wonZzFHEDY&ust=1721727987890000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjCv96uuocDFQAAAAAdAAAAABAJ",
  ogAuthor: "dunghh",
  ogWebsiteAuthor: "dunghh",
  canonical: "https://AR-Demo.netlify.app/",
  // Metatag
  robots: "index, follow",
  language: "en",
  revisitAfter: "7 days",
  distribution: "global",
  region: "VN",
  googlebot: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  contentLanguage: "en",
  ogType: "website",
  ogLocale: "en_IN",
};
