export const getTime = (date: Date) => {
  if (!date) throw Error(`Error: undefined value`);

  try {
    const parsedDate = date instanceof Date ? date : new Date(date);
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const seconds = parsedDate.getSeconds();

    const adjustedHours = hours < 10 ? `0${hours}` : hours;
    const adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const adjustedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${adjustedHours}:${adjustedMinutes}:${adjustedSeconds}`;
  } catch (err) {
    if (typeof date === "string") return date;
  }
};
