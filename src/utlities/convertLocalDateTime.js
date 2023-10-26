export function convertLocalDateTime(datetime) {
  // The datetimes are being sent through as UTC time.
  // In this function we are converting the date to  a string with a
  // language-sensitive representation of this date. We are also converting
  // the time to the local time.
  return new Date(datetime).toLocaleString("en-AU", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
