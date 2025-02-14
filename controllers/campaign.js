const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const { campaignSchema } = require('../middleware/validation');

// Get a single campaign by ID
const getSingle = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('campaigns').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
  
  // Get all campaigns
  const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db().collection('campaigns').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  };
  
  // Create a new campaign
  const createCampaign = async (req, res) => {
    try{
      const { error } = campaignSchema.validate(req.body, { abortEarly: false });
      if (error) {
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }

    const campaign = {
      title: req.body.title,
      dungeonMaster: req.body.dungeonMaster,
      players: req.body.players,
      startDate: req.body.startDate,
      description: req.body.description,
      encounters: req.body.encounters,
      notes: req.body.notes
    };
    const response = await mongodb
    .getDb()
    .db()
    .collection('campaigns')
    .insertOne(campaign);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the campaign.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  // Update a campaign by ID
  const updateCampaign = async (req, res) => {
    try{
      const { error } = campaignSchema.validate(req.body, { abortEarly: false });
      if (error) {
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }

    const userId = new ObjectId(req.params.id);
    const campaign = {
      title: req.body.title,
      dungeonMaster: req.body.dungeonMaster,
      players: req.body.players,
      startDate: req.body.startDate,
      description: req.body.description,
      encounters: req.body.encounters,
      notes: req.body.notes
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('campaigns')
      .replaceOne({ _id: userId }, campaign);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the campaign.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  //Delete a campaign by ID
  const deleteCampaign = async (req, res) => {
    try{
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('campaigns')
      .deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the campaign.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  module.exports = {
    getSingle,
    getAll,
    createCampaign, 
    updateCampaign,
    deleteCampaign
  };