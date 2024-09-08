export const deepClone = <T>(object: T): T => {
  if (object instanceof HTMLElement) return object.cloneNode() as T;

  if (object instanceof Date) return object;
  if (typeof object !== "object" || object === null) return object;

  let newObj = Array.isArray(object) ? ([] as T) : ({} as T);

  let key: string;

  for (key in object) {
    (newObj as any)[key] = deepClone<keyof T>((object as any)[key]);
  }

  return newObj;
};
