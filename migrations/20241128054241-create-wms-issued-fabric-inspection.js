'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WMSIssuedFabricInspections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fabricCollectionId: {
        type: Sequelize.INTEGER
      },
      wareHouseId: {
        type: Sequelize.INTEGER
      },
      allocatedQty: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      usedQty: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      status: {
        defaultValue: "Pending",
        type: Sequelize.STRING
      },
      allocatedBy: {
        type: Sequelize.INTEGER
      },
      inspectedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WMSIssuedFabricInspections');
  }
};