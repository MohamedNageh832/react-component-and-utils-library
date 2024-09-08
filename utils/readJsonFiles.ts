import { getObjectsMatchPercentage } from "./getObjectMatchPercentage";

interface IResult {
  filesOpened: any[];
  filesSkipped: any[];
  success?: boolean;
}

interface IFilter {
  exclude: any[];
}

type ReadJsonFilesFunction = (
  files: FileList | File[],
  filter?: IFilter
) => Promise<IResult>;

export const readJsonFiles: ReadJsonFilesFunction = async (files, filter) => {
  const { exclude } = filter || {};
  const result: IResult = {
    filesOpened: [],
    filesSkipped: [],
  };
  const promises = [];

  for (let i = 0; i < files.length; i++) {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        try {
          const contents = JSON.parse(event.target.result);
          contents.filename = files[i].name;

          result.success = true;

          if (exclude) {
            for (let j = 0; j < exclude.length; j++) {
              const object = exclude[i];
              const matchPercentage = getObjectsMatchPercentage(
                object,
                contents
              );

              if (matchPercentage === 100) return resolve(result);

              const fileIsOpened = matchPercentage > 50;

              if (fileIsOpened) {
                contents.matchPercentage = matchPercentage.toFixed(0);
                contents.matchedFile = { filename: object.filename, index: j };

                result.filesSkipped.push(contents);
                return resolve(result);
              }
            }
          }

          result.filesOpened.push(contents);

          resolve(result);
        } catch (error) {
          resolve({ success: false, error });
        }
      };

      reader.onerror = function (event: any) {
        const { error } = event.target;

        resolve({ success: false, error });
      };

      reader.readAsText(files[i]);
    });

    promises.push(promise);
  }

  return Promise.all(promises).then(() => result);
};
