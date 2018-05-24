const faker = require('faker');

module.exports = function(userList) {
  let folderList = [
    {
      title: 'fireblast folder',
      description: 'a folder focused on pve',
      author_id: 1
    },
    {
      title: '2nd folder',
      description: 'a folder focused on pvp',
      author_id: 2,
    },
    {
      title: 'third folder, no desc',
      author_id: 1
    },
  ];

  for(let i = 0; i < 200; i++) {
    folderList.push({
      title: faker.commerce.productMaterial(),
      description: faker.lorem.paragraph(),
      author_id: userList[Math.floor(Math.random() * userList.length)].id
    });
  }

  return folderList;
}