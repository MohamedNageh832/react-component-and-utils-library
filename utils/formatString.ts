export const formatString = (str: string) => {
  if (typeof str !== "string") str = (str as any).toString();

  //remove special characters
  str = str.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    ""
  );

  return str
    .replaceAll(/(أ|إ|آ)/gi, "ا")
    .replaceAll(/(ة)/gi, "ه")
    .replaceAll(/(ى)/gi, "ي")
    .replaceAll(/(ـ)/gi, "")
    .replaceAll("  ", " ")
    .trim()
    .toLowerCase();
};
