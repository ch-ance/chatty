const db = require("../dbConfig");

module.exports = {
  find,
  add
};

function find() {
  return db("users").select("*");
}

async function add(user) {
  const newUser = await db("users")
    .insert(user)
    .returning("*");
  return newUser;
}
