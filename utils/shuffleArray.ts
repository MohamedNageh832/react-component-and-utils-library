import { getRandomInteger } from "./getRandomInteger";

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length - 1;
  let randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = getRandomInteger(0, currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
