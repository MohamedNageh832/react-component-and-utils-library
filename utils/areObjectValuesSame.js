export const areObjectValuesSame = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (typeof obj2[key] === "object" && obj2[key] && obj1[key]) {
      const areSame = areObjectValuesSame(obj2[key], obj1[key]);
      if (!areSame) return false;
    } else if (obj2[key] !== obj1[key]) return false;
  }

  return true;
};
