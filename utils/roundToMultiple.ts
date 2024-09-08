export const roundToMultiple = (num: number, multiple: number): number => {
  return Math.round(num / multiple) * multiple;
};
