export function isUrlValid(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' || '^(ftps?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

export function isSchemeValid(str) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:' || newUrl.protocol === 'ftp:' || newUrl.protocol === 'ftps:';
  } catch (err) {
    return false;
  }
 }