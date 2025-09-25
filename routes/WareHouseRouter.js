const WareHouseController = require('../controllers/WareHouseController');
const BaseRouter = require('./BaseRouter');
const wareHouseRouter = new BaseRouter(WareHouseController);
module.exports = wareHouseRouter.getRouter();
