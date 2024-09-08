const MILLISECONDS_IN_ONE_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_ONE_MINUTE = 1000 * 60;
const MILLISECONDS_IN_ONE_SECOND = 1000;

export const getTimeDifference = (date1: Date, date2: Date) => {
  const diff = Math.abs(date1.getTime() - date2.getTime());

  const hours = Math.floor(diff / MILLISECONDS_IN_ONE_HOUR);
  const minutes = Math.floor((diff / MILLISECONDS_IN_ONE_MINUTE) % 60);
  const seconds = Math.floor((diff / MILLISECONDS_IN_ONE_SECOND) % 60);

  return { hours, minutes, seconds };
};
