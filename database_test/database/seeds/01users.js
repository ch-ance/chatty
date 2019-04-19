exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Austen", password: "password", is_online: "false" },
        { username: "Bob", password: "password", is_online: "false" },
        { username: "Chad", password: "password", is_online: "false" },
        { username: "David", password: "password", is_online: "false" }
      ]);
    });
};
