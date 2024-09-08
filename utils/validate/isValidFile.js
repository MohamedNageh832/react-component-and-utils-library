export const isValidFile = (object) => {
  try {
    const dt = new DataTransfer();
    dt.items.add(object);

    return true;
  } catch (err) {
    return false;
  }
};
