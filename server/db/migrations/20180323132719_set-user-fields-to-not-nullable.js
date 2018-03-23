
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('user', function(table) {
        // add new column
        table.string('username').unique().notNullable();

        // change columns
        table.string('email').notNullable().alter();
        table.string('password_digest').notNullable().alter();
        table.enu('role', ['standard', 'moderator', 'admin']).defaultTo('standard').notNullable().alter();
        
        // drop name column, using username instead
        table.dropColumn('name');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('user', function(table) {

        // table.string('email').unique().nullable().alter();
        // table.string('password_digest').nullable().alter();
        // table.enu('role', ['standard', 'moderator', 'admin']).defaultTo('standard').nullable().alter();

        // adding name back in, in case of rollback
        table.string('name');

        table.dropColumn('username');
    });
};
