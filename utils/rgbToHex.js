function componentToHex(c) {
  if (!c) return "";
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  const result =
    "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return result.replaceAll("##", "#");
}
