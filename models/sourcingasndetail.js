'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SourcingAsnDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SourcingAsnDetail.init({
    UniqueID:{
      type: DataTypes.STRING,    
      primaryKey: true
    },
    InvoiceNo:{
      type: DataTypes.STRING
    },
    status:{
      type: DataTypes.STRING
    },
    SupplierName:{
      type: DataTypes.STRING
    }, 
    ProductGroup:{
      type: DataTypes.STRING
    },
    OrderNo:{
      type: DataTypes.STRING
    },
    ArticleCode:{
      type: DataTypes.STRING
    },
    ArticleName:{
      type: DataTypes.STRING
    },
    ColorName:{
      type: DataTypes.STRING
    },
    OCNo:{
      type: DataTypes.STRING
    },
    StyleName:{
      type: DataTypes.STRING
    },
    ShadeLot:{
      type: DataTypes.STRING
    },
    UOM:{
      type: DataTypes.STRING
    },
    Qty:{
      type: DataTypes.STRING
    },
    carton:{
      type: DataTypes.STRING
    },
    
  }, {
    sequelize,
    modelName: 'SourcingAsnDetail',
    tableName:'VwModelCFAISourcingASNDetail',
    timestamps:false,
    
  });
  return SourcingAsnDetail;
};