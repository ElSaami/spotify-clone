export function millisToMinutesAndSeconds(millis){
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60 
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") +
    seconds;
}

export function millisToHoursAndMinutes(millis) {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);

  const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'hr' : 'hr'}` : '';
  const minutesText = minutes > 0 ? `${minutes} ${minutes === 1 ? 'min' : 'min'}` : '';

  const separator = hoursText && minutesText ? ' ' : '';

  return `${hoursText}${separator}${minutesText}`;
}
