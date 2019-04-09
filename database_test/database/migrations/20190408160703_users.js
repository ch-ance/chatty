exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    // PRIMARY KEY
    tbl.increments("id");

    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl.string("password", 255).notNullable();

    tbl.string("socket_id", 255);
    tbl.boolean("is_online").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
