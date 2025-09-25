
// src/controllers/FabricController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const WMSFabricCollection = db.sequelizeDb2.models.WMSFabricCollection;
const { Sequelize } = require('sequelize');

class FabricController extends BaseController {

  constructor() {
    super(WMSFabricCollection); // Pass the model to the base controller
  }
  async getAll(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { fromDate, toDate, page = 1, limit = 50, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = req.query;

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
            model: this.model.associations.fbin.target,
            as: 'fbin',
            attributes: ["id", "BinNo", "palletId"],
          }
        ],
        order: sortOptions,
        ...paginationOptions
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
      //CALL WFX API HERE





      //TILL HERE
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

module.exports = new FabricController();

