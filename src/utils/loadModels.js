const loadModels = () => {
  const contextGlb = require.context("../assets/models", false, /\.glb$/);
  const contextUsdz = require.context("../assets/models", false, /\.usdz$/);
  const models = contextGlb.keys().map((key, index) => {
    const id = index + 1;
    const name = `Shoes ${id.toString().padStart(2, "0")}`;
    const modelSrc = contextGlb(key);
    const iOSSrc = contextUsdz(
      `./${key.split("/").pop().replace(".glb", ".usdz")}`
    );
    return {
      id,
      name,
      modelSrc,
      iOSSrc,
      category: "Shoes",
      color: "",
    };
  });

  return models;
};

export const loadThumbnails = () => {
  const contextThumbnails = require.context(
    "../assets/thumbnails",
    false,
    /\.png$/
  );
  return contextThumbnails.keys().map((key, index) => ({
    src: contextThumbnails(key),
    alt: `Shoes ${index + 1}`,
    index,
  }));
};

export default loadModels;
