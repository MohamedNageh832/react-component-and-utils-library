export const swapArrayValues = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]];
};
