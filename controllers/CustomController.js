// src/controllers/CustomController.js

const db = require('../models');
const { WMSIssuedFabricInspection, WMSFabricCollection, WMSIssueFabricFactory } = db.sequelizeDb2.models;
const { Op } = require('sequelize');

class CustomController {
    /**
     * Allocates batches to fabric inspection and updates fabric collection.
     * Includes transaction management with rollback on failure.
     * @param {object} req - The request object
     * @param {object} res - The response object
     */
    async batchAllocateToInspection(req, res) {
        const transaction = await db.sequelizeDb2.transaction(); // Start a transaction
        try {
            // Extract and validate the request parameters
            const { issuedFabricInspection, fabricCollection } = req.body;

            if (!issuedFabricInspection || !Array.isArray(issuedFabricInspection) || issuedFabricInspection.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Invalid or missing "issuedFabricInspection" data.',
                    result: [],
                });
            }

            if (!fabricCollection?.data || !fabricCollection?.ids || !Array.isArray(fabricCollection.ids) || fabricCollection.ids.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Invalid or missing "fabricCollection" data.',
                    result: [],
                });
            }

            // Perform database operations within the transaction
            const createdItems = await WMSIssuedFabricInspection.bulkCreate(issuedFabricInspection, { transaction });

            const [updated] = await WMSFabricCollection.update(fabricCollection.data, {
                where: { id: fabricCollection.ids },
                transaction,
            });

            // Commit the transaction
            await transaction.commit();

            // Send success response
            res.status(200).json({
                status: 200,
                message: 'Successfully allocated to inspection.',
                result: {
                    createdItemsCount: createdItems.length,
                    updatedCollectionsCount: updated,
                },
            });
        } catch (error) {
            // Rollback the transaction on error
            if (transaction) await transaction.rollback();

            console.error('Error in batchAllocateToInspection:', error.message);

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                result: [],
            });
        }
    }
    async allocateToInspection(req, res) {
        const transaction = await db.sequelizeDb2.transaction();
        try {
            const [updated] = await WMSFabricCollection.update({
                status: 'Allocated to Inspection',
            }, {
                where: req.body,
                transaction,
            });
            await transaction.commit();

            // Send success response
            res.status(200).json({
                status: 200,
                message: 'Successfully allocated to inspection.',
                result: {
                    updatedCollectionsCount: updated,
                },
            });
        } catch (error) {
            // Rollback the transaction on error
            if (transaction) await transaction.rollback();

            console.error('Error in batchAllocateToInspection:', error.message);

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                result: [],
            });
        }
    }
    async inspectionUpdate(req, res) {
        const transaction = await db.sequelizeDb2.transaction();
        try {
            const { invoiceNo, ocNo, poNo, styleName, status } = req.body;
            const [updated] = await WMSFabricCollection.update({
                status: status,
            }, {
                where:
                {
                    invoiceNo: invoiceNo,
                    ocNo: ocNo,
                    poNo: poNo,
                    styleName: styleName
                }
                ,
                transaction,
            });
            await transaction.commit();

            // Send success response
            res.status(200).json({
                status: 200,
                message: 'Inspection Status updated Successfully.',
                result: {
                    updatedFabricRollsCount: updated,
                },
            });
        } catch (error) {
            // Rollback the transaction on error
            if (transaction) await transaction.rollback();


            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                result: [],
            });
        }
    }
    /**
     * Issues fabric by updating issued and balance quantities, and logs the issuance.
     * Handles transaction management and error reporting.
     * @param {object} req - The request object
     * @param {object} res - The response object
     */
    async issueFabric(req, res) {
        const transaction = await db.sequelizeDb2.transaction();
        try {
            const { invoiceNo, ocNo, poNo, styleName, shadeLot, issueQty, issuedBy, facility } = req.body;

            // Retrieve the fabric record to update
            const fabric = await WMSFabricCollection.findOne({
                where: {
                    invoiceNo,
                    ocNo,
                    poNo,
                    styleName,
                    shadeLot,
                },
                transaction,
            });

            if (!fabric) {
                return res.status(404).json({
                    status: 404,
                    message: 'Fabric record not found.',
                    result: [],
                });
            }

            // Calculate new balance and issued quantities
            const newBalanceQty = fabric.balanceQty - issueQty;
            if (newBalanceQty < 0) {
                await transaction.rollback();
                return res.status(400).json({
                    status: 400,
                    message: 'Issued quantity exceeds available balance.',
                    result: [],
                });
            }

            const newIssuedQty = (fabric.issuedQty || 0) + issueQty;
            const newStatus = newBalanceQty === 0 ? 'Issued' : fabric.status;

            // Update the fabric collection record
            await WMSFabricCollection.update(
                {
                    issuedQty: newIssuedQty,
                    balanceQty: newBalanceQty,
                    status: newStatus,
                },
                {
                    where: {
                        invoiceNo,
                        ocNo,
                        poNo,
                        styleName,
                        shadeLot,
                    },
                    transaction,
                }
            );

            // Log the issuance in the IssueFabricFactory table
            await WMSIssueFabricFactory.create(
                {
                    fabricCollectionId: fabric.id,
                    facility: facility,
                    wareHouseId: fabric.wareHouseId,
                    issuedBy: issuedBy,
                    issuedQty: issueQty,
                },
                { transaction }
            );

            await transaction.commit();

            res.status(200).json({
                status: 200,
                message: 'Fabric issued successfully.',
                result: {
                    issuedQty: issueQty,
                    newBalanceQty,
                },
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('Error in issueFabric:', error.message);

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                result: [],
            });
        }
    }
    async inspectionUpdateWMS(req, res) {
        const transaction = await db.sequelizeDb2.transaction();
        let passedFabricCount, rejectedFabricCount = 0;
        try {
            const { inspectedBy, fabricCollectionId, invoiceNo, ocNo, poNo, styleName, status, colorName, fabricRef } = req.body;
            const pendingFabricCount = await WMSFabricCollection.findAndCountAll({
                where: {
                    invoiceNo: invoiceNo,
                    ocNo: ocNo,
                    poNo: poNo,
                    styleName: styleName,
                    colorName: colorName,
                    fabricRef: fabricRef,
                    status: "Allocated to Inspection"
                }
            });
            if (pendingFabricCount.count == 1) {
                rejectedFabricCount = await WMSFabricCollection.findAndCountAll({
                    where: {
                        invoiceNo: invoiceNo,
                        ocNo: ocNo,
                        poNo: poNo,
                        styleName: styleName,
                        colorName: colorName,
                        fabricRef: fabricRef,
                        status: "Reject"
                    }
                });
                passedFabricCount = await WMSFabricCollection.findAndCountAll({
                    where: {
                        invoiceNo: invoiceNo,
                        ocNo: ocNo,
                        poNo: poNo,
                        styleName: styleName,
                        colorName: colorName,
                        fabricRef: fabricRef,
                        status: "Pass"
                    }
                });
            }

            // const fabricCounts = await WMSFabricCollection.findAll({
            //     attributes: [
            //         [db.sequelizeDb2.fn('SUM', db.sequelizeDb2.literal(`CASE WHEN status = 'Reject' THEN 1 ELSE 0 END`)), 'rejectedCount'],
            //         [db.sequelizeDb2.fn('SUM', db.sequelizeDb2.literal(`CASE WHEN status = 'Pass' THEN 1 ELSE 0 END`)), 'passedCount']
            //         [db.sequelizeDb2.fn('SUM', db.sequelizeDb2.literal(`CASE WHEN status = 'Allocated to Inspection' THEN 1 ELSE 0 END`)), 'pendingFabricCount']

            //     ],
            //     where: {
            //         invoiceNo: invoiceNo,
            //         ocNo: ocNo,
            //         poNo: poNo,
            //         styleName: styleName,
            //         colorName: colorName,
            //         fabricRef: fabricRef
            //     },
            //     raw: true
            // });

            // const { rejectedCount, passedCount, pendingFabricCount } = fabricCounts[0];
            let tempStatus = status;
            if (pendingFabricCount.count == 1) {
                if (rejectedFabricCount > passedFabricCount) tempStatus = "Reject";
                if (rejectedFabricCount < passedFabricCount) tempStatus = "Pass";

            }
            const [updated] = await WMSFabricCollection.update(
                {
                    status: tempStatus,
                },
                {
                    where: {
                        ...(pendingFabricCount.count == 1
                            ? {
                                invoiceNo: invoiceNo,
                                ocNo: ocNo,
                                poNo: poNo,
                                styleName: styleName,
                                colorName: colorName,
                                fabricRef: fabricRef,
                            }
                            : { id: fabricCollectionId }),
                        status: { [Op.notIn]: ['Pass', 'Reject'] },
                    },
                    transaction,
                }
            );

            const [updated2] = await WMSIssuedFabricInspection.update({
                status: status,
                inspectedBy: inspectedBy
            }, {
                where: {
                    fabricCollectionId: fabricCollectionId
                }
                ,
                transaction,
            });

            await transaction.commit();

            // Send success response
            res.status(200).json({
                status: 200,
                message: 'Status updated Successfully.',
                result: {
                    updatedCollectionsCount: updated,
                },
            });
        } catch (error) {
            // Rollback the transaction on error
            if (transaction) await transaction.rollback();


            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                result: [],
            });
        }
    }
}

module.exports = new CustomController();
