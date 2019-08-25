const db = require("../dbConfig");

module.exports = {
  find,
  findByUsername,
  add
};

function find() {
  return db("users").select("*");
}

function findByUsername(username) {
  return db("users")
    .select("*")
    .where({ username });
}

async function add(user) {
  const newUser = await db("users")
    .insert(user)
    .returning("*");
  return newUser;
}
