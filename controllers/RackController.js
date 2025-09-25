
// src/controllers/RackController.js
//test purpose
const db = require('../models');
const BaseController = require('./BaseController');
const WMSRack = db.sequelizeDb2.models.WMSRack;

class RackController extends BaseController {

  constructor() {
    super(WMSRack); // Pass the model to the base controller
  }
  async getOneByCustomKey(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { ...filters } = req.body;

      // Combine all options and fetch data
      const item = await this.model.findOne({
        where: {
          "rackNumber": filters["rackNumber"],
          "wareHouseId": filters["wareHouseId"]
        },
        attributes: ["id", "rackNumber"],
        include: [
          {
            model: this.model.associations.bays.target, // Association to bays
            as: 'bays',
            where: { "bayNumber": filters["bayNumber"] },
            attributes: ["id", "bayNumber"],
            include: [
              {
                model: this.model.associations.bays.target.associations.levels.target, // Association to bays
                as: 'levels',
                attributes: ["id", "levelNumber"],
                include: [
                  {
                    model: this.model.associations.bays.target.associations.levels.target.associations.bins.target, // Association to bays
                    as: 'bins',
                    attributes: ["id", "BinNo", "palletId"],
                  }
                ]
              },
            ]
          },
        ],
      });

      // Respond with paginated data and metadata
      res.status(200).json({
        status: 200,
        message: `${this.model.name} fetched successfully`,
        result: item
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        result: {},
      });
    }
  }
}

module.exports = new RackController();

