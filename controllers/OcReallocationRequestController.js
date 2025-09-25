const db = require('../models');
const BaseController = require('./BaseController');
const { Sequelize } = require('sequelize');
const { WMSOcReallocationRequest, WMSFabricCollection } = db.sequelizeDb2.models;

class OcReallocationRequestController extends BaseController {
    constructor() {
        super(WMSOcReallocationRequest);
    }

    async getAll(req, res) {
        try {
            const { fromDate, toDate, page = 1, limit = 50, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = req.query;
            const offset = (page - 1) * limit;
            const paginationOptions = { offset: parseInt(offset), limit: parseInt(limit) };
            const sortOptions = [[sortBy, sortOrder.toUpperCase()]];

            const filterOptions = {};
            for (const key in filters) {
                filterOptions[key] = filters[key];
            }
            if (fromDate && toDate) {
                const startDate = new Date(fromDate);
                const endDate = new Date(toDate);
                endDate.setHours(23, 59, 59, 999);
                filterOptions.createdAt = {
                    [Sequelize.Op.between]: [startDate, endDate],
                };
            }

            const items = await this.model.findAndCountAll({
                where: filterOptions,
                order: sortOptions,
                ...paginationOptions
            });

            res.status(200).json({
                status: 200,
                message: `${this.model.name}s fetched successfully`,
                result: items.rows,
                pagination: {
                    totalItems: items.count,
                    totalPages: Math.ceil(items.count / limit),
                    currentPage: parseInt(page),
                    pageSize: parseInt(limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message,
                result: [],
            });
        }
    }

    async create(req, res) {
        try {
            //change qty from fabric collection one to another
            let fromFabricCollectionId = req?.body?.fromFabricCollectionId;
            let toFabricCollectionId = req?.body?.toFabricCollectionId;
            const item1 = await WMSFabricCollection.findByPk(fromFabricCollectionId);
            const item2 = await WMSFabricCollection.findByPk(toFabricCollectionId);
            if (item1 && item2 && item1.balanceQty < req?.body?.qtyToAllocate) {
                return res.status(400).json({
                    status: 400,
                    message: 'Insufficient balance quantity kindly check and confirm',
                    result: {}
                });
            }
            if (!item1 || !item2) {
                return res.status(404).json({
                    status: 404,
                    message: 'Fabric collection not found',
                    result: {}
                });
            }
            const reqParams1 =
                item1.balanceQty - req?.body?.qtyToAllocate == 0
                    ? {
                        balanceQty: item1.balanceQty - req?.body?.qtyToAllocate,
                        issuedQty: item1.issuedQty + req?.body?.qtyToAllocate,
                        status: 'Issued',
                    }
                    : {
                        balanceQty: item1.balanceQty - req?.body?.qtyToAllocate,
                        issuedQty: item1.issuedQty + req?.body?.qtyToAllocate,
                    };


            const reqParams2 = {
                balanceQty: item2.balanceQty + req?.body?.qtyToAllocate,
            }


            await WMSFabricCollection.update(reqParams1, {
                where: { id: fromFabricCollectionId }
            });
            await WMSFabricCollection.update(reqParams2, {
                where: { id: toFabricCollectionId }
            });
            //till here
            const item = await this.model.create(req.body);
            res.status(200).json({
                status: 200,
                message: `${this.model.name} created successfully`,
                result: item
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message,
                result: {}
            });
        }
    }
}

module.exports = new OcReallocationRequestController();
