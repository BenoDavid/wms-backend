// routes/batch.js
const SourcingAsnDetailController = require('../controllers/SourcingAsnDetailController');
const BaseRouter = require('./BaseRouter');
const batchRouter = new BaseRouter(SourcingAsnDetailController);
module.exports = batchRouter.getRouter();
