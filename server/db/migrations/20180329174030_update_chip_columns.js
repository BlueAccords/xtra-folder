
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('chip', function(t) {
    // change columns
    t.integer('damage').nullable().alter();
    t.enu('element', [
      'fire', 'aqua', 'elec', 'wood', 
      'sword', 'wind', 'cursor', 'break', 'plus', 
      'recovery', 'obstacle', 'invisible', 'ground_cracking']
    ).alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('chip', function(t) {
    t.enu('element', [
      'fire', 'aqua', 'elec', 'wood', 
      'sword', 'wind', 'cursor', 'break', 'plus', 
      'recovery', 'obstacle', 'invisible', 'ground_cracking']
    ).alter();
    t.integer('damage').nullable().alter();
  });
};
