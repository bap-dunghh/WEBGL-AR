const loadModels = () => {
  const contextGlb = require.context("../assets/models", false, /\.glb$/);
  const contextUsdz = require.context("../assets/models", false, /\.usdz$/);
  const models = contextGlb.keys().map((key, index) => {
    const id = index + 1;
    const name = `Item ${id.toString().padStart(2, "0")}`;
    const modelSrc = contextGlb(key);
    const iOSSrc = contextUsdz(
      `./${key.split("/").pop().replace(".glb", ".usdz")}`
    );
    const result = {
      id,
      name,
      modelSrc,
      iOSSrc,
      category: "Items",
      color: "",
    }
    return result;
  });
  return models
};

export const loadThumbnails = () => {
  const contextThumbnails = require.context(
    "../assets/thumbnails",
    false,
    /\.png$/
  );
  const result =  contextThumbnails.keys().map((key, index) => ({
    src: contextThumbnails(key),
    alt: `Item ${index + 1}`,
    index,
  }))
  return result;
};

export default loadModels;
