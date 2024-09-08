import { DB_TABLE_NAMES } from "@/constants/dbTableNames";
import { DBManager } from "@/helpers";

const db = new DBManager("ACE_DB");
type DBSchema = {
  [key: string]: any;
};

const initDB = async () => {
  const tableNames = Object.values(DB_TABLE_NAMES);
  const dbSchema: DBSchema = {};

  for (let i = 0; i < tableNames.length; i++) {
    const tableName = tableNames[i];

    dbSchema[tableName] = { primaryKey: "id", autoIncrement: true };
  }

  // TODO: handle dropping tables on schema change & renaming table
  await db.createDBSchema(dbSchema);
};

export { db, initDB };
