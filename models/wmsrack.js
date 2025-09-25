'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSRack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSRack.belongsTo(models.WMSWareHouse, {
        foreignKey: 'wareHouseId',
        as: 'warehouse'
      });
      WMSRack.hasMany(models.WMSBay, {
        foreignKey: 'rackId',
        as: 'bays'
      });
    }
  }
  WMSRack.init({
    rackNumber: DataTypes.STRING,
    wareHouseId: DataTypes.INTEGER,
    enabled: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'WMSRack',
  });
  return WMSRack;
};