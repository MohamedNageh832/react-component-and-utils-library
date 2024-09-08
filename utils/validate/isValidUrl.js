export const isValidUrl = (string) => {
  const proccessedUrl = string.includes("://") ? string : `https://${string}`;

  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  const isValid = pattern.test(proccessedUrl);

  try {
    new URL(proccessedUrl);

    return isValid;
  } catch (err) {
    return false;
  }
};
