import Dexie from "dexie";

const db = new Dexie("SampleDB");
db.version(1).stores({ messages: "++id" });
db.version(2).stores({ friends: "++id" });

export default db;
