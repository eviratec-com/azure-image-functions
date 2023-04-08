const { Readable } = require('node:stream');
const Jimp = require('jimp');

module.exports = async function (imageUrl, width) {
  // Read the image.
  const image = await Jimp.read(imageUrl);

  // Resize the image to input width and auto height.
  const resize = await image.resize(width, Jimp.AUTO)

  // Get the resulting image as a buffer
  const buffer = await image.getBufferAsync(Jimp.AUTO);

  // Return the buffer
  return bufferToStream(buffer);
}

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;
}
