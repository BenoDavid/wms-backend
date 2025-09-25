const { WMSGDNCancelRequests } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            //call gdn api cancel request creation- wfx

            //till here
            const request = await WMSGDNCancelRequests.create(req.body);
            res.status(201).json(request);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async findAll(req, res) {
        try {
            const requests = await WMSGDNCancelRequests.findAll();
            res.json(requests);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async findOne(req, res) {
        try {
            const request = await WMSGDNCancelRequests.findByPk(req.params.id);
            if (!request) return res.status(404).json({ error: 'Not found' });
            res.json(request);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            //check quantity and update in fabric collection

            //till here
            const [updated] = await WMSGDNCancelRequests.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) return res.status(404).json({ error: 'Not found' });
            const updatedRequest = await WMSGDNCancelRequests.findByPk(req.params.id);
            res.json(updatedRequest);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async delete(req, res) {
        try {
            const deleted = await WMSGDNCancelRequests.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) return res.status(404).json({ error: 'Not found' });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
