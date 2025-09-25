'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WMSGDNCancelRequest extends Model {
        static associate(models) {
            // Define associations here if needed
        }
    }
    WMSGDNCancelRequest.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        gdnId: DataTypes.INTEGER,
        reason: DataTypes.STRING,
        requestedBy: DataTypes.STRING,
        status: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WMSGDNCancelRequests',
    });
    return WMSGDNCancelRequest;
};