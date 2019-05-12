import Dexie from "dexie";

const db = new Dexie("chatty");
db.version(1).stores({
  contacts: "&contactID, nickname, myID"
});

export default db;
