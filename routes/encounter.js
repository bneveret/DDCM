const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/encounter');
const validation = require('../middleware/validate');

router.get('/', encounterController.getAll);
router.get('/:id', encounterController.getSingle);

router.post('/', validation.saveEncounter, encounterController.createEncounter);
router.put('/:id', validation.saveEncounter, encounterController.updateEncounter);
router.delete('/:id', encounterController.deleteEncounter);

module.exports = router;