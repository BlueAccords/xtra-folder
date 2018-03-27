
exports.up = function(knex, Promise) {
  return knex.schema.createTable('folder', function(t) {
    t.increments();
    t.string('title', 100).notNullable();
    t.string('description', 1000);
    t.integer('author_id').unsigned();
    t.foreign('author_id').references('id').inTable('user')
      .onDelete('SET NULL').onUpdate('CASCADE');
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('folder');
};
