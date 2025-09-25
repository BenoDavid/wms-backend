// routes/batch.js
const FabricController = require('../controllers/FabricController');
const BaseRouter = require('./BaseRouter');
const fabricRouter = new BaseRouter(FabricController);
module.exports = fabricRouter.getRouter();
