'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WMSIssueFabricFactories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fabricCollectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      facility: {
        type: Sequelize.STRING,
        allowNull: false
      },
      requestedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },

      warehouseName: {
        type: Sequelize.STRING
      },
      issuedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      issueQty: {
        type: Sequelize.INTEGER
      },
      invoiceNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      poNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shadeLot: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ocNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
        allowNull: false
      },
      issuedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull: true
      },
      factoryId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      wareHouseId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('WMSIssueFabricFactories');
  }
};