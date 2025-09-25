const OcReallocationRequestController = require('../controllers/OcReallocationRequestController');
const BaseRouter = require('./BaseRouter');
const ocReallocationRequestRouter = new BaseRouter(OcReallocationRequestController);
module.exports = ocReallocationRequestRouter.getRouter();
