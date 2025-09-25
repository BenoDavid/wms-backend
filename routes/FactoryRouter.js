const FactoryController = require('../controllers/FactoryController');
const BaseRouter = require('./BaseRouter');
const factoryRouter = new BaseRouter(FactoryController);
module.exports = factoryRouter.getRouter();
