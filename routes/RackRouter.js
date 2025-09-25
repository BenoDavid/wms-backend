const RackController = require('../controllers/RackController');
const BaseRouter = require('./BaseRouter');
const rackRouter = new BaseRouter(RackController);
module.exports = rackRouter.getRouter();
