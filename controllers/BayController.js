
// src/controllers/BayController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const WMSBay = db.sequelizeDb2.models.WMSBay;

class BayController extends BaseController {

  constructor() {
    super(WMSBay);
  }

}

module.exports = new BayController();

