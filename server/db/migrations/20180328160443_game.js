exports.up = function(knex, Promise) {
  return knex.schema.createTable('game', function(t) {
    t.increments();
    t.string('title', 200).notNullable();
    t.string('description', 500);
    t.integer('parent_game_id').unsigned().nullable();
    t.foreign('parent_game_id').references('id').inTable('game')
      .onDelete('SET NULL').onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('game');
};
