'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSFabricCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WMSFabricCollection.belongsTo(models.WMSBayLevelBin, {
        foreignKey: 'binId',
        as: 'fbin'
      });
      WMSFabricCollection.hasMany(models.WMSIssueFabricFactory, {
        foreignKey: 'id',
        as: 'fabricCollection'
      });
    }
  }
  WMSFabricCollection.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    palletId: DataTypes.STRING,
    invoiceNo: DataTypes.STRING,
    wareHouseId: DataTypes.INTEGER,
    binId: DataTypes.INTEGER,
    location: DataTypes.STRING,

    status: {
      type: DataTypes.STRING,
      defaultValue: "Quarantine"
    },
    totalQty: DataTypes.INTEGER,
    sampleQty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    issuedQty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    balanceQty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    fabricRef: DataTypes.STRING,
    supplierName: DataTypes.STRING,
    poNo: DataTypes.STRING,
    colorName: DataTypes.STRING,
    ocNo: DataTypes.STRING,
    styleName: DataTypes.STRING,
    shadeLot: DataTypes.STRING,
    rollNo: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'WMSFabricCollection',
  });
  return WMSFabricCollection;
};