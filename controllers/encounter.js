const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// Get all encounters
const getSingle = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('encounters').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
  
  // Get a single encounter by ID
  const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db().collection('encounters').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  };
  
  // Create a new encounter
  const createEncounter = async (req, res) => {
    try{
    const encounter = {
      campaign: req.body.campaign,
      name: req.body.name,
      enemies: req.body.enemies,
      difficulty: req.body.difficulty,
      location: req.body.location,
      rewards: req.body.rewards,
      notes: req.body.notes
    };
    const response = await mongodb
    .getDb()
    .db()
    .collection('encounters')
    .insertOne(encounter);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the encounter.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  // Update an encounter by ID
  const updateEncounter = async (req, res) => {
    try{
    const userId = new ObjectId(req.params.id);
    const encounter = {
        campaign: req.body.campaign,
        name: req.body.name,
        enemies: req.body.enemies,
        difficulty: req.body.difficulty,
        location: req.body.location,
        rewards: req.body.rewards,
        notes: req.body.notes
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('encounters')
      .replaceOne({ _id: userId }, encounter);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the encounter.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  //Delete an encounter by ID
  const deleteEncounter = async (req, res) => {
    try{
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('encounters')
      .deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the encounter.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  module.exports = {
    getSingle,
    getAll,
    createEncounter, 
    updateEncounter,
    deleteEncounter
  };