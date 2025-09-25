'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSIssuedFabricInspection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSIssuedFabricInspection.belongsTo(models.WMSFabricCollection, {
        foreignKey: 'fabricCollectionId',
        as: 'fabricCollection'
      });

    }
  }
  WMSIssuedFabricInspection.init({
    fabricCollectionId: DataTypes.INTEGER,
    wareHouseId: DataTypes.INTEGER,
    allocatedQty: DataTypes.INTEGER,
    usedQty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    allocatedBy: DataTypes.INTEGER,
    inspectedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WMSIssuedFabricInspection',
  });
  return WMSIssuedFabricInspection;
};