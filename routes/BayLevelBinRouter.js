const BayLevelBinController = require('../controllers/BayLevelBinController');
const BaseRouter = require('./BaseRouter');
const bayLevelBinRouter = new BaseRouter(BayLevelBinController);
module.exports = bayLevelBinRouter.getRouter();
