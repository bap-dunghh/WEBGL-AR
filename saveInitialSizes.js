const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src/assets/models');
const thumbnailsDir = path.join(__dirname, 'src/assets/thumbnails');
const outputFilePath = path.join(__dirname, 'src', 'fileSizes.json'); // Đặt fileSizes.json trong thư mục src

const getFilesSizes = (dir) => {
  return fs.readdirSync(dir).reduce((acc, file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    acc[file] = stats.size;
    return acc;
  }, {});
};

const saveInitialSizes = () => {
  const modelsSizes = getFilesSizes(modelsDir);
  const thumbnailsSizes = getFilesSizes(thumbnailsDir);

  const data = {
    models: modelsSizes,
    thumbnails: thumbnailsSizes,
  };

  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
  console.log('Initial file sizes saved to', outputFilePath);
};

saveInitialSizes();
