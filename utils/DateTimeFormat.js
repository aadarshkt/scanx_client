export function convertTimeString(
  inputString
) {
  console.log(
    "input string:" + inputString
  );
  // Split the input string into days, hours, minutes, and seconds
  const [
    days,
    hours,
    minutes,
    seconds,
  ] = inputString.split(":");
  console.log(
    " TIME " +
      days +
      hours +
      minutes +
      seconds
  );
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
