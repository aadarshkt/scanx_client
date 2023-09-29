export function convertTimeString(
  inputString
) {
  // Split the input string into days, hours, minutes, and seconds
  const [
    days,
    hours,
    minutes,
    seconds,
  ] = inputString.split(":");
  // Format the result string based on the conditions
  let result = `${days} days`;
  if (parseInt(hours) > 0) {
    result += ` ${parseInt(
      hours
    )} hour${
      parseInt(hours) > 1 ? "s" : ""
    }`;
  }
  if (parseInt(minutes) > 0) {
    result += ` ${parseInt(
      minutes
    )} minute${
      parseInt(minutes) > 1 ? "s" : ""
    }`;
  }

  return result;
}
