const express = require('express');
const router = express.Router();

const campaignController = require('../controllers/campaign');
const { validateObjectId } = require('../middleware/validation.js');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
  };

router.get('/', campaignController.getAll);
router.get('/:id', validateObjectId, campaignController.getSingle);

router.post('/', ensureAuthenticated, campaignController.createCampaign);
router.put('/:id', ensureAuthenticated, campaignController.updateCampaign);
router.delete('/:id', ensureAuthenticated, validateObjectId, campaignController.deleteCampaign);

module.exports = router;