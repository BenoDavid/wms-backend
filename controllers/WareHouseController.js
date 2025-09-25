
// src/controllers/WareHouseCollectionController.js
//test purpose
const { where } = require('sequelize');
const db = require('../models');
const BaseController = require('./BaseController');
const WMSWareHouse = db.sequelizeDb2.models.WMSWareHouse;

class WareHouseController extends BaseController {

  constructor() {
    super(WMSWareHouse);
  }
  async getById(req, res) {
    try {
      const item = await this.model.findOne({
        where: { id: req.params.id },
        attributes: ["wareHouseName"],
        include: [
          {
            model: this.model.associations.racks.target, // Association to racks
            as: 'racks',
            attributes: ["id", "rackNumber"],
            include: [
              {
                model: this.model.associations.racks.target.associations.bays.target, // Association to bays
                as: 'bays',
                attributes: ["id", "bayNumber"],
                include: [
                  {
                    model: this.model.associations.racks.target.associations.bays.target.associations.levels.target, // Association to bays
                    as: 'levels',
                    attributes: ["id", "levelNumber"],
                    include: [
                      {
                        model: this.model.associations.racks.target.associations.bays.target.associations.levels.target.associations.bins.target, // Association to bays
                        as: 'bins',
                        attributes: ["id", "BinNo", "palletId"],
                      }
                    ]
                  },
                ]
              },
            ],
          },
        ],
      });

      if (item) {
        res.status(200).json({
          status: 200,
          message: `${this.model.name}s fetched successfully`,
          result: item,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        result: {},
      });
    }
  }

}

module.exports = new WareHouseController();

