module.exports = function(folderCountObj, chipCountObj) {
  let chip_codes = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'
  ];

  let allChipCopies = [];
  const folderCount = (folderCountObj[0]['count(`id`)']);
  const chipCount = (chipCountObj[0]['count(`id`)']);

  for(let i = 1; i < folderCount; i++) {
    for(let j = 0; j < 30; j++) {
      let chipIdNum = Math.floor(Math.random() * chipCount) + 1; 
      if(chipIdNum == 0) {
        console.log('AAA')
      }
      allChipCopies.push({
        code: chip_codes[Math.floor(Math.random() * chip_codes.length)],
        folder_id: i,
        chip_id: chipIdNum
      });
    }
  }

  // console.log(allChipCopies);

  return allChipCopies;

  /**
   * - Iterate through every folder
   * - pick 30 random chips by id #, give them a code
   * - add a new chip_copy to the main list
   *  - includes code, folder_id, chip_id
   */
}