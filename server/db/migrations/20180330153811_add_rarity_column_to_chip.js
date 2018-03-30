
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('chip', function(t) {
    t.integer('rarity').unsigned().nullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('chip', function(t) {
    t.dropColumn('rarity');
  });
};
