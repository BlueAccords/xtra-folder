exports.up = function(knex, Promise) {
  return knex.schema.createTable('chip', function(t) {
    t.increments();
    t.string('original_name', 200).notNullable();
    t.string('long_name', 200).nullable();
    t.string('original_description', 200).nullable();
    t.string('long_description', 200).nullable();
    t.integer('chip_number').unsigned().nullable();
    t.string('image_path', 200).nullable();
    // TODO: remove null from enum list
    t.enu('element', [
      'null', 'fire', 'aqua', 'elec', 'wood', 
      'sword', 'wind', 'cursor', 'break', 'plus_minus', 
      'recovery', 'block']);
    t.enu('type', [
      'standard', 'mega', 'giga', 'dark'
    ]);

    // TODO: make damage signed, -1 = ???? for muramasa and numberball
    t.integer('damage').unsigned().nullable();
    t.integer('memory').unsigned().nullable();
    // references the main game(typically mmbn3, mmbn4, mmbn5, mmbn6)
    t.integer('primary_game_id').unsigned().nullable();
    t.foreign('primary_game_id').references('id').inTable('game')
      .onDelete('SET NULL').onUpdate('CASCADE');

    // may or may not need this
    // references sub game(typically red, blue, colonel, protoman, or gregar/falzer)
    t.integer('sub_game_id').unsigned().nullable();
    t.foreign('sub_game_id').references('id').inTable('game')
      .onDelete('SET NULL').onUpdate('CASCADE');
  });

  // TODO: add rarity column, 1-5 integer
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chip');
};

