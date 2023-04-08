const { BlockBlobClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = {
  bufferSize: 4 * ONE_MEGABYTE,
  maxBuffers: 20,
};

module.exports = async function (buff, destContainer, destUri) {
  const blobClient = new BlockBlobClient(connectionString, destContainer, destUri);

  await blobClient.uploadStream(
    buff,
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers,
    {
      blobHTTPHeaders: {
        blobContentType: "image/jpeg"
      }
    }
  );

  return blobClient;
}
