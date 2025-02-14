const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/encounter');
const validateObjectId = require('../middleware/validation');

router.get('/', encounterController.getAll);
router.get('/:id', validateObjectId, encounterController.getSingle);

router.post('/', encounterController.createEncounter);
router.put('/:id', encounterController.updateEncounter);
router.delete('/:id', validateObjectId, encounterController.deleteEncounter);

module.exports = router;