import { formatString } from "@/utils";
import { DBFilterType } from "./types";

type FilterDataFn = (
  data: any[],
  filter: any,
  filterType: DBFilterType | undefined
) => typeof data;

const filterData: FilterDataFn = (data, filter, filterType = "any") => {
  const keys = Object.keys(filter);
  let result = [];

  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    let isMatch = true;

    if (filterType === "strict") {
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const includesIt = formatString(record[key]).includes(
          formatString(filter[key])
        );
        const equalsIt = formatString(record[key]) == formatString(filter[key]);

        if (!(includesIt || equalsIt)) {
          isMatch = false;
          break;
        }
      }
    } else if (filterType === "any") {
      for (let j = 0; j < keys.length; j++) {
        if (record[keys[i]] === filter[keys[i]]) break;
      }
    }

    if (isMatch) result.push(record);
  }

  return result;
};

export { filterData };
