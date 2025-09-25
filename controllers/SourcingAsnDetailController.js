
// src/controllers/SourcingAsnDetailController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const SourcingAsnDetail = db.sequelizeDb1.models.SourcingAsnDetail;

class SourcingAsnDetailController extends BaseController {

  constructor() {
    super(SourcingAsnDetail); // Pass the model to the base controller
  }
  //overriden method
  async getAll(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { ...filters } = req.query;

      // Set up filtering
      const filterOptions = {};
      for (const key in filters) {
        filterOptions[key] = filters[key];
      }

      // Combine all options and fetch data
      const items = await this.model.findAndCountAll({
        where: filterOptions
      });

      // Respond with paginated data and metadata
      res.status(200).json({
        status: 200,
        message: `${this.model.name}s fetched successfully`,
        result: items.rows,
        datas: {
          totalItems: items.count,
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

}

module.exports = new SourcingAsnDetailController();

