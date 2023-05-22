const streamOutputToFile = require('../src/streamOutputToFile');
const resizeImage = require('../src/resizeImage');

const containerName = process.env.THUMBNAIL_BLOB_CONTAINER_NAME;

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    const blobItemUrl = myQueueItem.data.blobUrl;
    const [
      blobItemPath,
      site,
      user,
      year,
      month,
      day,
      filename,
      extension
    ] = blobItemUrl.match(/([a-z0-9]{3,})\/([0-9]{7,})\/([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\/(.+)\.([a-z]{3,})$/);

    try {
      const buff = await resizeImage(blobItemUrl, 200);
      const result = await streamOutputToFile(
        buff,
        containerName,
        `${site}/${user}/${year}/${month}/${day}/${filename}.${extension}`
      );
    }
    catch (e) {
      context.log(e.message);
      context.log(e);
    }
};
