exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("ID");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
