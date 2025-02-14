const express = require('express');
const router = express.Router();

const campaignController = require('../controllers/campaign');
const validateObjectId = require('../middleware/validation');

router.get('/', campaignController.getAll);
router.get('/:id', validateObjectId, campaignController.getSingle);

router.post('/', campaignController.createCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', validateObjectId, campaignController.deleteCampaign);

module.exports = router;