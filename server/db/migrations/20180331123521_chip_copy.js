exports.up = function(knex, Promise) {
  return knex.schema.createTable('chip_copy', function(t) {
    t.increments();
    t.specificType('code', 'CHAR(1)').notNullable(); // single value chip code

    t.integer('chip_id').unsigned().notNullable();
    t.foreign('chip_id').references('id').inTable('chip')
      .onDelete('CASCADE').onUpdate('CASCADE');

    t.integer('folder_id').unsigned().notNullable();
    t.foreign('folder_id').references('id').inTable('folder')
      .onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chip_copy');
};

