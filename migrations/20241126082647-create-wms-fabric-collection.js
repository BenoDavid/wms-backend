'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WMSFabricCollections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palletId: {
        type: Sequelize.STRING
      },
      invoiceNo: {
        type: Sequelize.STRING
      },
      wareHouseId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      binId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: "Quarantine",
        type: Sequelize.STRING
      },
      totalQty: {
        type: Sequelize.INTEGER
      },
      sampleQty: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      issuedQty: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      balanceQty: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      fabricRef: {
        type: Sequelize.STRING
      },
      supplierName: {
        type: Sequelize.STRING
      },
      poNo: {
        type: Sequelize.STRING
      },
      colorName: {
        type: Sequelize.STRING
      },
      ocNo: {
        type: Sequelize.STRING
      },
      styleName: {
        type: Sequelize.STRING
      },
      shadeLot: {
        type: Sequelize.STRING
      },
      rollNo: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('WMSFabricCollections');
  }
};