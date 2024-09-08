import { deepClone } from "@/utils";
import {
  DBFilterType,
  DBSchemaType,
  GetByFilterFn,
  TableSchema,
} from "./types";
import { filterData } from "./utils";

class DBManager {
  name: string;
  private db: IDBDatabase | null;
  version: number;

  constructor(name: string) {
    this.name = name;
    this.db = null;
    this.version = -1;

    this.#requestPersistantStorage();
  }

  connect() {
    return new Promise(async (resolve, reject) => {
      await this.#getVersion();

      const IDBOpenReq = indexedDB.open(this.name, this.version);

      IDBOpenReq.addEventListener("success", (e: any) => {
        this.db = e.target.result as IDBDatabase;

        resolve(null);
      });

      IDBOpenReq.addEventListener("error", reject);
    });
  }

  async fetchDB() {
    const databases = await indexedDB.databases();
    return databases.filter((db) => db.name === this.name)[0];
  }

  // TODO: handle not adding
  createDBSchema(schema: DBSchemaType) {
    return new Promise(async (resolve, reject) => {
      const tableNames = Object.keys(schema);
      const nonDuplicateTables = deepClone(tableNames);
      if (this.version === -1) await this.#getVersion();
      const dbExists = await this.fetchDB();

      if (dbExists) {
        const objectStoreNames =
          (await this.#getObjectStores()) as DOMStringList;

        for (let i = 0; i < tableNames.length; i++) {
          const tableName = tableNames[i];

          if (!objectStoreNames.contains(tableName)) continue;

          const index = nonDuplicateTables.indexOf(tableName);
          nonDuplicateTables.splice(index, 1);
        }

        if (nonDuplicateTables.length === 0) return resolve(null);

        this.version++;
      }

      const IDBOpenReq = indexedDB.open(this.name, this.version);

      IDBOpenReq.addEventListener("upgradeneeded", async (e: any) => {
        this.db = e.target.result as IDBDatabase;
        for (let i = 0; i < nonDuplicateTables.length; i++) {
          const tableName = nonDuplicateTables[i];

          const { primaryKey: keyPath, autoIncrement } = schema[tableName];

          this.db.createObjectStore(tableName, { keyPath, autoIncrement });
        }

        resolve(null);
      });

      IDBOpenReq.addEventListener("error", reject);
    });
  }

  // TODO: attach the schema to the table as a saved data to validate when adding or updating
  // You have to await every time you use multple calls of this function
  createTable(tableName: string, schema: TableSchema) {
    return new Promise(async (resolve, reject) => {
      const { primaryKey: keyPath, autoIncrement } = schema;

      if (this.version === -1) await this.#getVersion();

      const dbExists = await this.fetchDB();

      if (dbExists) {
        const objectStoreNames =
          (await this.#getObjectStores()) as DOMStringList;
        if (objectStoreNames.contains(tableName)) return resolve(null);

        this.version++;
      }

      const IDBUpgradeVersionReq = indexedDB.open(this.name, this.version);

      IDBUpgradeVersionReq.addEventListener("upgradeneeded", async (e: any) => {
        this.db = e.target.result as IDBDatabase;

        try {
          this.db.createObjectStore(tableName, { keyPath, autoIncrement });

          resolve(null);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async dropTable(tableName: string) {
    if (this.version === -1) await this.#getVersion();
    const IDBOpenReq = indexedDB.open(this.name, ++this.version);

    IDBOpenReq?.addEventListener("upgradeneeded", (e: any) => {
      this.db = e.target?.result as IDBDatabase;
      const { objectStoreNames } = this.db;

      if (!objectStoreNames.contains(tableName)) return;

      this.db.deleteObjectStore(tableName);
    });
  }

  async #getObjectStores() {
    return new Promise((resolve, reject) => {
      const IDBOpenReq = indexedDB.open(this.name, this.version);

      IDBOpenReq.addEventListener("success", (e: any) => {
        const db = e.target?.result as IDBDatabase;
        resolve(db.objectStoreNames);
      });

      IDBOpenReq.addEventListener("error", (err) => reject(err));
    });
  }

  async #getVersion() {
    const databases = await indexedDB.databases();

    return new Promise((resolve, reject) => {
      const db = databases.filter((db) => db.name === this.name)[0];

      this.version = db && db.version ? db.version : 1;

      resolve(this.version);
    });
  }

  getRecordsCount(
    tableName: string
  ): Promise<[err: Event, data: null] | [err: null, data: number]> {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(tableName, (err) =>
        reject([err, null])
      );

      const req = tx.objectStore(tableName).count();

      req.addEventListener("success", () => {
        resolve([null, req.result]);
      });

      req.addEventListener("error", (err) => {
        resolve([err, null]);
      });
    });
  }

  insert(
    tableName: string,
    data: any
  ): Promise<{ success: boolean; id: IDBValidKey; err: Event | null }> {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(tableName, (err) =>
        reject({ success: false, err })
      );
      const store = tx.objectStore(tableName);

      const request = store.add(data);

      request.addEventListener("success", () => {
        this.#requestPersistantStorage();

        const id = request.result;
        return resolve({ success: true, id, err: null });
      });

      request.addEventListener("error", (err) => {
        reject({ success: false, err, id: null });
      });
    });
  }

  getByRange(
    tableName: string,
    fromIndex: number,
    toIndex: number
  ): Promise<{ success: boolean; err: Event | null; data: any[] | null }> {
    return new Promise(async (resolve, reject) => {
      const dbExists = await this.fetchDB();

      if (!dbExists)
        return reject({
          err: `cannot find a database with name "${this.name}"`,
        });

      const tx = await this.#createTransaction(tableName, (err) =>
        reject({ success: false, err })
      );
      const store = tx.objectStore(tableName);
      const request = store.getAll(null, toIndex + 1);

      request.addEventListener("success", () => {
        const data = request.result.slice(fromIndex, toIndex + 1);
        resolve({ success: true, data, err: null });
      });

      request.addEventListener("error", (err) => {
        reject({ success: false, err });
      });
    });
  }

  get(tableName: string, primaryKey: string) {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(tableName, (err) =>
        reject({ success: false, err })
      );
      const store = tx.objectStore(tableName);
      const request = store.get(primaryKey);

      request.addEventListener("success", () => {
        const data = request.result;

        resolve({ success: true, data });
      });

      request.addEventListener("error", (err) => {
        reject({ success: false, err });
      });
    });
  }

  getByFilter: GetByFilterFn = (
    tableName: string,
    filter: Object,
    filterType?: DBFilterType
  ): Promise<
    | { success: boolean; data: any; err: null }
    | { success: boolean; data: null; err: Event }
  > => {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(tableName, (err) =>
        reject({ success: false, err })
      );
      const store = tx.objectStore(tableName);

      const request = store.getAll();
      request.addEventListener("success", () => {
        const data = filterData(request.result, filter, filterType);
        return resolve({ success: true, data, err: null });
      });

      request.addEventListener("error", (err) => {
        reject({ success: false, err, data: null });
      });
    });
  };

  delete(
    tableName: string,
    primaryKey: string | number
  ): Promise<{ success: boolean; err: Event | null }> {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(
        tableName,
        (err) => reject({ success: false, err }),
        () => resolve({ success: true, err: null })
      );
      const store = tx.objectStore(tableName);

      const request = store.delete(primaryKey);

      request.addEventListener("error", (err) => {
        reject({ success: false, err });
      });
    });
  }

  update(
    tableName: string,
    data: any,
    primaryKey?: string | number
  ): Promise<
    | { success: boolean; data: any; err: null }
    | { success: boolean; data: null; err: Event }
  > {
    return new Promise(async (resolve, reject) => {
      const tx = await this.#createTransaction(
        tableName,
        (err) => reject({ success: false, err }),
        () => resolve({ success: true, data, err: null })
      );

      const store = tx.objectStore(tableName);
      const keyPath = store.keyPath as string;

      const noPrimaryKey = primaryKey && primaryKey.toString() === "";
      const noKeyPath = data[keyPath] && data[keyPath].toString() === "";
      if (noPrimaryKey && noKeyPath) {
        return reject({ message: "Error: No primary key was provided" });
      }

      const request = store.put(data, primaryKey);

      request.addEventListener("success", this.#requestPersistantStorage);

      request.addEventListener("error", (err) => {
        reject({ success: false, err });
      });
    });
  }

  #createTransaction(
    tableName: string,
    onError?: (err: any) => void,
    onComplete?: (e: any) => void,
    mode: IDBTransactionMode = "readwrite"
  ): Promise<IDBTransaction> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) await this.connect();

      const tx = this.db?.transaction(tableName, mode);
      if (!tx) throw Error("Error creating a transaction");

      if (onComplete) tx.addEventListener("complete", onComplete);
      if (onError) tx.addEventListener("error", onError);

      if (!tx) return reject("Failed to create transaction!");
      resolve(tx);
    });
  }

  async #requestPersistantStorage() {
    if (!("Notification" in window)) return;
    await Notification.requestPermission();

    if (!navigator.storage) return;

    const isPersisted = await navigator.storage.persisted();
    if (isPersisted) return;

    await navigator.storage.persist();
  }
}

export default DBManager;
