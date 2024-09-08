export const getObjectsMatchPercentage = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  let matchedValuesCount = 0;

  for (let i = 0; i < obj1Keys.length; i++) {
    const key = obj1Keys[i];

    if (typeof obj1[key] === "object" && obj1[key] && obj2[key]) {
      const matchPercentage = getObjectsMatchPercentage(obj1[key], obj2[key]);

      if (matchPercentage > 90) matchedValuesCount++;
    } else if (obj1[key] === obj2[key]) matchedValuesCount++;
  }

  const totalCount = Math.max(obj1Keys.length, obj2Keys.length);

  return (matchedValuesCount / totalCount) * 100;
};
