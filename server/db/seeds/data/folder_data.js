
module.exports = function(user) {
  return [
    {
      title: 'fireblast folder',
      description: 'a folder focused on pve',
      author_id: user.id,
    },
    {
      title: '2nd folder',
      description: 'a folder focused on pvp',
      author_id: 2,
    },
    {
      title: 'third folder, no desc',
      author_id: user.id,
    },
  ];
}