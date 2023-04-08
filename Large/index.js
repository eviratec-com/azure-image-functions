const streamOutputToFile = require('../src/streamOutputToFile');
const resizeImage = require('../src/resizeImage');

const containerName = process.env.LARGE_BLOB_CONTAINER_NAME;

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    const blobItemUrl = myQueueItem.data.blobUrl;
    const [
      blobItemPath,
      user,
      year,
      month,
      day,
      filename,
      extension
    ] = blobItemUrl.match(/([0-9]{7,})\/([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\/(.+)\.([a-z]{3,})$/);

    context.log(
      `User: ${user} | Year: ${year} | Month: ${month} | Day: ${day} | `
      + `Filename: ${filename} | Extension: ${extension} | BlobItemUrl: ${blobItemUrl}`
    );

    try {
      const buff = await resizeImage(blobItemUrl, 1600);
      context.log(buff);
      const result = await streamOutputToFile(
        buff,
        containerName,
        `${user}/${year}/${month}/${day}/${filename}.${extension}`
      );
      context.log(result);
    }
    catch (e) {
      context.log(e.message);
      context.log(e);
    }
};
