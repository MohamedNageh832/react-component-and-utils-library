const isValidValue = (value, schemaType) => {
  return (
    typeof value === schemaType ||
    (schemaType === "url" && typeof value === "string")
  );
};

const createFile = (object) => {
  const dt = new DataTransfer();

  dt.items.add(object);
  return dt.files[0];
};

export const createFormData = (object, schema) => {
  if (!schema)
    throw Error("Error: please provide a schema to validate values formData");
  const keys = Object.keys(object);
  const formData = new FormData();

  keys.forEach((key) => {
    const value = object[key];

    if (schema[key] === "file" && typeof value === "object" && value) {
      return formData.append(key, value);
    }

    if (!schema[key] || !isValidValue(value, schema[key])) return;

    if (value) formData.append(key, value === true ? "1" : value);
  });

  return formData;
};
