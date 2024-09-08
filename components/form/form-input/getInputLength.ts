export const getInputLength = (input) => {
  const charLength = input.value.length;
  return `${charLength >= 14 ? charLength + 2 : 14}ch`;
};
