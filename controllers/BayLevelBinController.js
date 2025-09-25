
// src/controllers/BayLevelBinController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const WMSBayLevelBin = db.sequelizeDb2.models.WMSBayLevelBin;

class BayLevelBinController extends BaseController {

  constructor() {
    super(WMSBayLevelBin); 
  }

}

module.exports = new BayLevelBinController();

