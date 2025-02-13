const express = require('express');
const router = express.Router();

const campaignController = require('../controllers/campaign');
const validation = require('../middleware/validate');

router.get('/', campaignController.getAll);
router.get('/:id', campaignController.getSingle);

router.post('/', validation.saveCampaign, campaignController.createCampaign);
router.put('/:id', validation.saveCampaign, campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router;