const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/encounter');

router.get('/', encounterController.getAll);
router.get('/:id', encounterController.getSingle);

router.post('/', encounterController.createEncounter);
router.put('/:id', encounterController.updateEncounter);
router.delete('/:id', encounterController.deleteEncounter);

module.exports = router;