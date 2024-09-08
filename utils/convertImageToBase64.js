export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      resolve(e.target.result);
    });

    reader.addEventListener("error", reject);

    reader.readAsDataURL(file);
  });
};
