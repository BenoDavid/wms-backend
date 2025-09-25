// routes/batch.js
const IssuedFabricInspectionController = require('../controllers/IssuedFabricInspectionController');
const BaseRouter = require('./BaseRouter');
const IssuedFabricInspectionRouter = new BaseRouter(IssuedFabricInspectionController);
module.exports = IssuedFabricInspectionRouter.getRouter();
