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
      + `Filename: ${filename} | Extension: ${extension}`
    );
};
