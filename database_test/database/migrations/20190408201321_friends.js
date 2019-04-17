exports.up = function(knex) {
  return knex.schema.createTable("friends", tbl => {
    // PRIMARY KEY
    tbl.increments("id");

    // this user
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    // other user who is the friend
    tbl
      .integer("other_user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends");
};
