'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSBayLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSBayLevel.belongsTo(models.WMSBay, {
        foreignKey: 'bayId',
        as: 'bay'
      });    
      WMSBayLevel.hasMany(models.WMSBayLevelBin, {
        foreignKey: 'bayLevelId',
        as: 'bins'
      });
    }
  }
  WMSBayLevel.init({
    levelNumber: DataTypes.STRING,
    bayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WMSBayLevel',
  });
  return WMSBayLevel;
};