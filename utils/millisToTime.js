export function format_time(
  time_in_millisecond
) {
  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(
    time_in_millisecond /
      (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor(
    (time_in_millisecond %
      (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (time_in_millisecond %
      (1000 * 60 * 60)) /
      (1000 * 60)
  );
  const seconds = Math.floor(
    (time_in_millisecond %
      (1000 * 60)) /
      1000
  );

  // Format the result including days (DD:HH:MM:SS)
  const formattedtime_in_millisecond = `${days} days ${padZero(
    hours
  )} hours ${padZero(
    minutes
  )} minutes ${padZero(
    seconds
  )} seconds`;

  return formattedtime_in_millisecond;
}

function padZero(value) {
  return value < 10
    ? `0${value}`
    : `${value}`;
}
