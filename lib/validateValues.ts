import { BaseSchema, ValiError, keyof } from "valibot";

export const validateValues = <T>(schema: BaseSchema, values: T) => {
  const errors = {} as { [key in keyof T]: T[key] };

  try {
    schema.parse(values);
  } catch (err) {
    const { issues } = err as ValiError;

    for (let j = 0; j < Object.keys(issues).length; j++) {
      const error = issues[j];
      const [primaryPath, pathPosition, nestedPath] = error.path;

      if (nestedPath) {
        if (errors[primaryPath.key]) {
          errors[primaryPath.key][pathPosition.key][nestedPath.key] =
            error.message;
        } else {
          errors[primaryPath.key] = [
            {
              [nestedPath.key]: error.message,
            },
          ];
        }
      } else {
        errors[primaryPath.key] = error.message;
      }
    }

    return { isValid: false, errors };
  }

  return { isValid: true, errors };
};
