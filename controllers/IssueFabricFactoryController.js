
// src/controllers/FabricController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const { WMSIssueFabricFactory, WMSFabricCollection, WMSBayLevelBin } = db.sequelizeDb2.models;
const { Sequelize } = require('sequelize');

class IssueFabricFactoryController extends BaseController {

  constructor() {
    super(WMSIssueFabricFactory); // Pass the model to the base controller
  }
  async getAll(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { fromDate, toDate, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = req.query;

      // Set up pagination
      const offset = (page - 1) * limit;
      const paginationOptions = { offset: parseInt(offset), limit: parseInt(limit) };

      // Set up sorting
      const sortOptions = [[sortBy, sortOrder.toUpperCase()]];

      // Set up filtering
      const filterOptions = {};
      for (const key in filters) {
        filterOptions[key] = filters[key];
      }
      if (fromDate && toDate) {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        // Adjust endDate to include the entire day
        endDate.setHours(23, 59, 59, 999);

        filterOptions.createdAt = {
          [Sequelize.Op.between]: [startDate, endDate],
        };
      }
      // Combine all options and fetch data
      const items = await this.model.findAndCountAll({
        where: filterOptions,
        include: [
          {
            model: this.model.associations.fabricCollection.target,
            as: 'fabricCollection'
          },
          // {
          //   model: this.model.associations.wareHouse.target,
          //   as: 'wareHouse'
          // },
          // {
          //   model: this.model.associations.factory.target,
          //   as: 'factory'
          // }
        ],
        order: sortOptions,
        // ...paginationOptions
      });

      // Respond with paginated data and metadata
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
      const item = await this.model.create(req.body);
      res.status(200).json({
        status: 200,
        message: `${this.model.name} created successfully`,
        result: item
      });
    } catch (error) {
      // Show error details clearly
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error, // Include the full error object for debugging
        result: {}
      });
    }
  }
  async update(req, res) {
    const sequelize = db.sequelizeDb2;
    const transaction = await sequelize.transaction();
    try {
      if (req?.body?.status == 'Accepted') {
        const item = await WMSFabricCollection.findByPk(req?.body?.fabricCollectionId, { transaction });
        let OldBalanceQty = item?.balanceQty;
        let oldIssuedQty = item?.issuedQty || 0;
        let issuedQty = req?.body?.issueQty;
        if (OldBalanceQty < issuedQty) {
          await transaction.rollback();
          return res.status(204).json({
            status: 204,
            message: 'Insufficient balance quantity kindly check and confirm',
            result: {}
          });
        }
        if (OldBalanceQty == issuedQty) {
          // patchFabricCollectionData.palletId = null;
          const items = await WMSFabricCollection.findAndCountAll({
            where: {
              palletId: item?.palletId,
              status: 'Quarantine'
            },
            transaction
          });
          if (items.count == 1) {
            await WMSBayLevelBin.update({ palletId: null }, {
              where: { palletId: item?.palletId },
              transaction
            });
          }
        }
        const patchFabricCollectionData =
          OldBalanceQty - issuedQty == 0
            ? {
              balanceQty: OldBalanceQty - issuedQty,
              issuedQty: oldIssuedQty + issuedQty,
              status: 'Issued',
            }
            : {
              balanceQty: OldBalanceQty - issuedQty,
              issuedQty: oldIssuedQty + issuedQty,
            };
        await WMSFabricCollection.update(patchFabricCollectionData, {
          where: { id: req?.body?.fabricCollectionId },
          transaction
        });
      }
      const [updated] = await this.model.update(req.body, {
        where: { id: req.params.id },
        transaction
      });
      //call WFX API here - Dispatch Confirmation(GDN)


      //TILL HERE

      if (updated) {
        await transaction.commit();
        const item = await this.model.findByPk(req.params.id);
        res.status(200).json({
          status: 200,
          message: `${this.model.name}s updated successfully`,
          result: item,
          testing: req.body
        });
      } else {
        await transaction.rollback();
        res.status(404).json({
          status: 404,
          message: `${this.model.name} not found`,
          result: {},
        });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        status: 500,
        message: error.message,
        result: {},
      });
    }
  }
}

module.exports = new IssueFabricFactoryController();

