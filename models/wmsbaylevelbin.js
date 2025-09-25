'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSBayLevelBin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSBayLevelBin.belongsTo(models.WMSBayLevel, {
        foreignKey: 'bayLevelId',
        as: 'level'
      }); 
      WMSBayLevelBin.hasMany(models.WMSFabricCollection, {
        foreignKey: 'binId',
        as: 'fabricsInBin'
      }); 
    }
  }
  WMSBayLevelBin.init({
    BinNo: DataTypes.STRING,
    bayLevelId: DataTypes.INTEGER,
    palletId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WMSBayLevelBin',
  });
  return WMSBayLevelBin;
};