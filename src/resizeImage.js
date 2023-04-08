const { Readable } = require('node:stream');
const Jimp = require('jimp');

module.exports = async function (imageUrl, width) {
  // Read the image.
  const image = await Jimp.read(imageUrl);

  // Resize the image to input width and auto height.
  return Readable.from(await image.resize(width, jimp.AUTO).getBufferAsync('image/jpeg'));
}
