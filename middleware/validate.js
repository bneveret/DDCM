const validator = require('../helpers/validate');

const saveCampaign = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    dungeonMaster: 'string',
    players: 'array',
    startDate: 'date',
    description: 'string',
    encounter: 'array',
    notes: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveEncounter = (req, res, next) => {
  const validationRule = {
    campaign: 'string',
    name: 'required|string',
    enemies: 'array',
    difficulty: 'required|string|in:Easy,Medium,Hard,Deadly',
    location: 'required|string',
    rewards: 'string',
    notes: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCampaign,
  saveEncounter
};