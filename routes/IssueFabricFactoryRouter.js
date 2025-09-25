// routes/batch.js
const IssueFabricFactoryController = require('../controllers/IssueFabricFactoryController');
const BaseRouter = require('./BaseRouter');
const IssueFabricFactoryRouter = new BaseRouter(IssueFabricFactoryController);
module.exports = IssueFabricFactoryRouter.getRouter();
