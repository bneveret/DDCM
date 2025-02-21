const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/encounter');
const { validateObjectId } = require('../middleware/validation.js');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
  };

router.get('/', encounterController.getAll);
router.get('/:id', validateObjectId, encounterController.getSingle);

router.post('/', ensureAuthenticated, encounterController.createEncounter);
router.put('/:id', ensureAuthenticated, encounterController.updateEncounter);
router.delete('/:id', ensureAuthenticated, validateObjectId, encounterController.deleteEncounter);

module.exports = router;