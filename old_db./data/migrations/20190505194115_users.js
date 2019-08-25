exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("ID");
    users
      .integer("userID")
      .notNullable()
      .unique();
    users
      .string("username", 16)
      .unique()
      .notNullable();

    users.string("password", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
