'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WMSIssueFabricFactory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      WMSIssueFabricFactory.belongsTo(models.WMSFabricCollection, {
        foreignKey: 'fabricCollectionId',
        as: 'fabricCollection'
      });

    }
  }
  WMSIssueFabricFactory.init({
    fabricCollectionId: DataTypes.INTEGER,
    facility: DataTypes.STRING,
    requestedBy: DataTypes.STRING,
    warehouseName: DataTypes.STRING,
    issuedDate: DataTypes.DATE,
    issueQty: DataTypes.INTEGER,
    invoiceNo: DataTypes.STRING,
    poNo: DataTypes.STRING,
    shadeLot: DataTypes.STRING,
    ocNo: DataTypes.STRING,
    status: DataTypes.STRING,
    issuedBy: DataTypes.STRING,
    remarks: DataTypes.STRING,
    factoryId: DataTypes.INTEGER,
    wareHouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WMSIssueFabricFactory',
  });
  return WMSIssueFabricFactory;
};