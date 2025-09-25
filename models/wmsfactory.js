'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSFactory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSFactory.hasMany(models.WMSIssueFabricFactory, {
        foreignKey: 'factoryId',
        as: 'IssuedFabrics'
      });
    }
  }
  WMSFactory.init({
    name: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WMSFactory',
  });
  return WMSFactory;
};