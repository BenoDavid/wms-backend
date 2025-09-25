'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('WMSOcReallocationRequests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fromFabricCollectionId: {
                type: Sequelize.INTEGER
            },
            toFabricCollectionId: {
                type: Sequelize.INTEGER
            },
            qtyToAllocate: {
                type: Sequelize.INTEGER
            },
            wareHouseName: {
                type: Sequelize.STRING
            },
            requestedBy: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            updatedBy: {
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
        await queryInterface.dropTable('WMSOcReallocationRequests');
    }
};
