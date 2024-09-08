import { formatDate } from ".";

const processFileName = (filename: string) => {
  return filename.endsWith(".json") ? filename : `${filename}.json`;
};

const processFileContents = (contents: Object) => {
  const keys = Object.keys(contents);

  if (keys.indexOf("createdAt") === -1) {
    Object.assign(contents, { createdAt: formatDate(new Date()) });
  }

  Object.assign(contents, { updatedAt: formatDate(new Date()) });

  return JSON.stringify(contents);
};

const save = (filename: string, file: Blob) => {
  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();

  setTimeout(() => URL.revokeObjectURL(link.href), 60000);

  return { success: true, message: "تم حفظ الملفات بنجاح" };
};

const saveAs = async (filename: string, file: Blob) => {
  const opts = {
    suggestedName: filename,
    types: [
      {
        description: "Json file",
        accept: { "application/json": [".json"] },
      },
    ],
  };

  const handle = await window.showSaveFilePicker(opts);
  const writable = await handle.createWritable();
  await writable.write(file);
  writable.close();

  return { success: true, message: null };
};

export const writeJsonFile = async (values: Object, filename: string) => {
  const processedContents = processFileContents(values);

  const file = new Blob([processedContents], { type: "application/json" });
  const processedFilename = processFileName(filename);

  try {
    const result = await saveAs(processedFilename, file);

    return result;
  } catch (err: any) {
    if (err.toString().includes("user aborted")) {
      return { success: false, message: "تم الغاء العملية" };
    }
  }

  return save(processedFilename, file);
};
