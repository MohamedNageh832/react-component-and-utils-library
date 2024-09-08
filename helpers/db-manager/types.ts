type TableSchema = {
  primaryKey: "id" | string;
  autoIncrement?: boolean;
};

type DBFilterType = "strict" | "any";

type DBSchemaType = {
  [tableName: string]: TableSchema;
};

type GetByFilterFnReturnType = Promise<
  | { success: boolean; data: any; err: null }
  | { success: boolean; err: any; data: null }
>;

type GetByFilterFn = (
  tableName: string,
  filter: Object,
  filterType?: DBFilterType
) => GetByFilterFnReturnType;

export type { TableSchema, DBFilterType, DBSchemaType, GetByFilterFn };
