const Joi = require('joi');
const { ObjectId } = require('mongodb');

const validateObjectId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId validation')
      .required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  next();
};

const campaignSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  dungeonMaster: Joi.string().min(3).max(50).required(),
  players: Joi.array().items(Joi.string()).min(1).required(),
  startDate: Joi.date().iso().required(),
  description: Joi.string().max(500),
  encounters: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      difficulty: Joi.string().valid('Easy', 'Medium', 'Hard', 'Deadly').required(),
    })
  ),
  notes: Joi.string().max(1000)
});

const encounterSchema = Joi.object({
    campaign: Joi.string().required(), // Campaign ID should be required
    name: Joi.string().min(3).max(100).required(),
    enemies: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          health: Joi.number().integer().min(1).required(),
          abilities: Joi.array().items(Joi.string().max(100)).optional()
        })
      )
      .min(1)
      .required(),
    difficulty: Joi.string().valid('Easy', 'Medium', 'Hard', 'Deadly').required(),
    location: Joi.string().min(3).max(100).required(),
    rewards: Joi.array().items(Joi.string().max(100)).max(10).optional(),
    notes: Joi.string().max(1000).allow('')
  });

module.exports = { campaignSchema, encounterSchema, validateObjectId };
