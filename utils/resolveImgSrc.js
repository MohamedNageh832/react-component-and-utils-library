export const resolveImgSrc = (src) => {
  return typeof src === "string" ? src : !src ? "" : URL.createObjectURL(src);
};
