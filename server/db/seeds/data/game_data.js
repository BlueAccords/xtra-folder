
module.exports = {
  parent_game_data: function() {
    return [
      {
        id: 1,
        title: 'Megaman Battle Network 6',
        description: "MMBN6, includes cybeast falzar and cybeast gregar",
      },

    ]
  },
  child_game_data: function(parent_game) {
    return [
      {
        title: 'Cybeast Falzar',
        parent_game_id: parent_game.id
      },
      {
        title: 'Cybeast Gregar',
        parent_game_id: parent_game.id
      },
    ]
  }
}