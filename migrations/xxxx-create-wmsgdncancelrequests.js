'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WMSGDNCancelRequests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            gdnId: {
                type: Sequelize.INTEGER
            },
            reason: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('WMSGDNCancelRequests');
    }
};
