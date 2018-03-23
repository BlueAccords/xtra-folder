

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          email: 'ro1email@gmail.com',
          password_digest: 'password111',
          username: 'ro1username',
          role: 'standard'
        },
        {
          email: 'ro2email@gmail.com',
          password_digest: 'password111',
          username: 'ro2username',
          role: 'moderator'
        },
        {
          email: 'ro3email@gmail.com',
          password_digest: 'password111',
          username: 'ro3username',
          role: 'admin'
        },
      ]);
    });
};
