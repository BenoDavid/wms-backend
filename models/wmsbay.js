'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSBay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSBay.belongsTo(models.WMSRack, {
        foreignKey: 'rackId',
        as: 'rack'
      });
      WMSBay.hasMany(models.WMSBayLevel, {
        foreignKey: 'bayId',
        as: 'levels'
      });
    }
  }
  WMSBay.init({
    bayNumber: DataTypes.STRING,
    rackId: DataTypes.INTEGER,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WMSBay',
  });
  return WMSBay;
};