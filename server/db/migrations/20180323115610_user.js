
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
        table.increments();
        table.string('name');
        table.string('email').unique();
        table.string('password_digest');
        table.enu('role', ['standard', 'moderator', 'admin'])
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
};
