const express = require('express');
const router = express.Router();

const SourcingAsnDetailRoutes = require('./SourcingAsnDetailRouter');
const FabricsRouter = require('./FabricRouter');
const IssueFabricFactoryRouter = require('./IssueFabricFactoryRouter');
const WareHouseRouter = require('./WareHouseRouter');
const RackRouter = require('./RackRouter');
const BayRouter = require('./BayRouter');
const BayLevelRouter = require('./BayLevelRouter');
const BayLevelBinRouter = require('./BayLevelBinRouter');
const FactoryRouter = require('./FactoryRouter');
const IssuedFabricInspectionRouter = require('./IssuedFabricInspectionRouter');
const customRouter = require('./CustomRouter');
const OcReallocationRequestRouter = require('./OcReallocationRequestRouter');
const WMSGDNCancelRequestRouter = require('./wmsgdncancelrequest');


// // Use routes
router.use('/SourcingAsnDetail', SourcingAsnDetailRoutes);
router.use('/FabricCollection', FabricsRouter);
router.use('/IssueFabricFactory', IssueFabricFactoryRouter);
router.use('/IssuedFabricInspection', IssuedFabricInspectionRouter);
router.use('/WareHouse', WareHouseRouter);
router.use('/Factory', FactoryRouter);

router.use('/Rack', RackRouter);
router.use('/Bay', BayRouter);
router.use('/BayLevel', BayLevelRouter);
router.use('/BayLevelBin', BayLevelBinRouter);
router.use('/cf', customRouter);
router.use('/OcReallocationRequest', OcReallocationRequestRouter);
router.use('/WMSGDNCancelRequest', WMSGDNCancelRequestRouter);

module.exports = router;


