exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("ID");
    users
      .integer("wsid")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
