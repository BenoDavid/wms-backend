// routes/batch.js

const express = require('express');
const CustomController = require('../controllers/CustomController');

const router = express.Router();

// Define the route for batch allocation to inspection
router.post('/batchAllocateToInspection', (req, res) => {
    CustomController.batchAllocateToInspection(req, res);
});
router.post('/allocate/inspection', (req, res) => {
    CustomController.allocateToInspection(req, res);
});
router.post('/issueFabric', (req, res) => {
    CustomController.issueFabric(req, res);
});
router.post('/allocate/inspection/update', (req, res) => {
    CustomController.inspectionUpdate(req, res);
});
router.post('/allocate/inspection/update/wms', (req, res) => {
    CustomController.inspectionUpdateWMS(req, res);
});
module.exports = router;
