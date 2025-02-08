const express = require('express');
const router = express.Router();

const campaignController = require('../controllers/campaign');

router.get('/', campaignController.getAll);
router.get('/:id', campaignController.getSingle);

router.post('/', campaignController.createCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router;