import { getRandomInteger } from "./getRandomInteger";

export const getRandomFromArray = <T>(array: T[], itemsCount: number): T[] => {
  const newSet: Set<string> = new Set();

  while (newSet.size < itemsCount) {
    const index = getRandomInteger(0, array.length - 1);
    const item = array[index];

    newSet.add(JSON.stringify(item));
  }

  return [...newSet].map((item) => JSON.parse(item));
};
