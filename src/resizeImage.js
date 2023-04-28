const { Readable } = require('node:stream');

const resizeImageBuff = require('./resizeImageBuff');

module.exports = async function (imageUrl, width) {
  // Fetch, rotate, and resize image, returning as a buffer
  const buffer = await resizeImageBuff(imageUrl, width);

  // Return the buffer as a stream
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
