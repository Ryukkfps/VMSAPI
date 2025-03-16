const Role = require('../models/roleModel');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!role) {
      return res.status(404).send();
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send(error);
  }
};
