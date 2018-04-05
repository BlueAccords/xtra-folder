exports.up = function(knex, Promise) {
  return knex.schema.createTable('chip_code', function(t) {
    // each chip can have n chip codes, but no duplicate valid chip codes
    t.primary(['code', 'chip_id']);
    t.specificType('code', 'CHAR(1)').notNullable(); // single value chip code

    t.integer('chip_id').unsigned().notNullable();
    t.foreign('chip_id').references('id').inTable('chip')
      .onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chip_code');
};

