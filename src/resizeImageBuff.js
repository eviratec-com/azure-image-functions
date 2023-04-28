const Exifr = require('exifr');
const Jimp = require('jimp');
const JpegAutorotate = require('jpeg-autorotate');

module.exports = async function (imageUrl, width) {
  // Read the image.
  const image = await readImageUrl(imageUrl);
  // const image = await Jimp.read(imageUrl);

  // Check the orientation
  const rotation = await Exifr.rotation(imageUrl);

  // Rotate the image if necessary
  if (rotation.deg) {
    const rotate = await image.rotate(rotation.deg);
  }

  // Resize the image to input width and auto height.
  const resize = await image.resize(width, Jimp.AUTO);

  // Get the resulting image as a buffer
  const buffer = await image.getBufferAsync(Jimp.AUTO);

  // Return the buffer
  return buffer;
}

async function readImageUrl (imageUrl) {
  try {
    // Read the image.
    const image = await Jimp.read(imageUrl);

    // Auto-rotate based on Exif
    const input = await image.getBufferAsync(Jimp.AUTO);
    const { buffer } = await JpegAutorotate.rotate(input);

    // Return Jimp image
    return await Jimp.read(buffer);
  }
  catch (error) {
    console.log(error);
    // return Jimp image on failure
    return Jimp.read(imageUrl);
    // jo.errors.read_file // File could not be opened
    // jo.errors.read_exif // EXIF data could not be read
    // jo.errors.no_orientation // No orientation tag was found
    // jo.errors.unknown_orientation // The orientation tag is unknown
    // jo.errors.correct_orientation // The image orientation is already correct
    // jo.errors.rotate_file // An error occurred when rotating the image
  }
}
