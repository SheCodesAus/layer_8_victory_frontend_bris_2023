export function emailIsValid(str) {
  const pattern = new RegExp(
    '^[a-z0-9]+' + // pattern begins with any character a to z and 0 to 9
    '@' + // email address must have @ symbol!
    '[a-z]+' + // followed by any character a to z (domain)
    '\\.[a-z]{2,4}' // followed by a . and at least 2 characters (e.g. .com)
  )
  return pattern.test(str);
}