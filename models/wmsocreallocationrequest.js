'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WMSOcReallocationRequest extends Model {
        static associate(models) {
        }
    }
    WMSOcReallocationRequest.init({
        fromFabricCollectionId: DataTypes.INTEGER,
        toFabricCollectionId: DataTypes.INTEGER,
        qtyToAllocate: DataTypes.INTEGER,
        wareHouseName: DataTypes.STRING,
        requestedBy: DataTypes.STRING,
        status: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WMSOcReallocationRequest',
    });
    return WMSOcReallocationRequest;
};