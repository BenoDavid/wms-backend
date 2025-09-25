'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const warehouses = [];
    // // for (let i = 1; i <= 1; i++) {
    //   warehouses.push({
    //     wareHouseName: `CW1`,
    //     enabled: true, // Enable for even-indexed warehouses
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // // }

    // //racks
    // const racks = [];
    // const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // // for (let i = 1; i <= 1; i++) {
    //   for (let j = 0; j < alphabet.length; j++) {
    //     racks.push({
    //       rackNumber: `${alphabet[j]}`,
    //       wareHouseId: 1,
    //       enabled: true,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });

    //   }
    // // }
    // //bays
    //  const bays = [];
    //  for (let i = 1; i < racks.length; i++) {
    //   for (let j = 1; j <= 10; j++) {
    //     bays.push({
    //       bayNumber: `B${j}`,
    //       rackId: i,
    //       enabled: true,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });

    //   }
    // }
    // const levels = [];
    // for (let i = 1; i < bays.length; i++) {
    //   for (let j = 3; j >= 1; j--) {
    //     levels.push({
    //       levelNumber: `L${j}`,
    //       bayId: i,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });

    //   }
    // }
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bins = [];
    for (let i = 26; i >=0; i--) {
      for (let j = 60; j >=1; j--) {
          bins.push(
            {
            BinNo: `${alphabets[i]+j}`,
            bayLevelId: i,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );
    }
  }
      
 
    // await queryInterface.bulkInsert('WMSWareHouses', warehouses);
    // await queryInterface.bulkInsert('WMSRacks', racks);
    // await queryInterface.bulkInsert('WMSBays', bays);
    // await queryInterface.bulkInsert('WMSBayLevels', levels);
    await queryInterface.bulkInsert('WMSBayLevelBins', bins);
    return true;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WMSBayLevelBins', null, { truncate: true, cascade: true });
    // await queryInterface.bulkDelete('WMSBays', null, { truncate: true, cascade: true });
    // await queryInterface.bulkDelete('WMSBayLevels', null, { truncate: true, cascade: true });
    // await queryInterface.bulkDelete('WMSRacks', null, { truncate: true, cascade: true });
    // return queryInterface.bulkDelete('WMSWareHouses', null, { truncate: true, cascade: true });
  }
};
