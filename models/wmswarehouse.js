'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSWareHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSWareHouse.hasMany(models.WMSRack, {
        foreignKey: 'wareHouseId',
        as: 'racks'
      });
      WMSWareHouse.hasMany(models.WMSIssueFabricFactory, {
        foreignKey: 'wareHouseId',
        as: 'IssuedFabrics'
      });
    }
  }
  WMSWareHouse.init({
    wareHouseName: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WMSWareHouse',
  });
  return WMSWareHouse;
};