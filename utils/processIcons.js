export const processIcons = (...iconPacks) => {
  const icons = iconPacks.reduce(
    (prev, currPack) => [
      ...prev,
      ...Object.keys(currPack)
        .filter((key) => key !== "fas" && key !== "fab" && key !== "prefix")
        .map((icon) => currPack[icon]),
    ],
    []
  );

  return icons;
};
