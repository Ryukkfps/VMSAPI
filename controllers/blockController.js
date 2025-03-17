const Block = require('../models/blockModel');

// Create a new block
exports.createBlock = async (req, res) => {
  try {
    const block = new Block(req.body);
    await block.save();
    res.status(201).send(block);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.find();
    res.status(200).send(blocks);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllBlocksBySocietyid = async (req, res) => {
  try {
    const blocks = await Block.find({ SId: req.body.societyid });
    res.status(200).send(blocks);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get a single block by ID
exports.getBlockById = async (req, res) => {
  try {
    const block = await Block.findById(req.params.id);
    if (!block) {
      return res.status(404).send();
    }
    res.status(200).send(block);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a block
exports.updateBlock = async (req, res) => {
  try {
    const block = await Block.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!block) {
      return res.status(404).send();
    }
    res.status(200).send(block);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a block
exports.deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByIdAndDelete(req.params.id);
    if (!block) {
      return res.status(404).send();
    }
    res.status(200).send(block);
  } catch (error) {
    res.status(500).send(error);
  }
};
