const BayLevelController = require('../controllers/BayLevelController');
const BaseRouter = require('./BaseRouter');
const bayLevelRouter = new BaseRouter(BayLevelController);
module.exports = bayLevelRouter.getRouter();
