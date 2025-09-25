const BayController = require('../controllers/BayController');
const BaseRouter = require('./BaseRouter');
const bayRouter = new BaseRouter(BayController);
// bayRouter.addCustomRoute('post', '/customRoute', BayController.getAll);
module.exports = bayRouter.getRouter();
