
// src/controllers/BayLevelController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const WMSBayLevel = db.sequelizeDb2.models.WMSBayLevel;

class BayLevelController extends BaseController {

  constructor() {
    super(WMSBayLevel); 
  }

}

module.exports = new BayLevelController();

