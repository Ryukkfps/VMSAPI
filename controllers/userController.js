const User = require("../models/userModel");
const Role = require("../models/roleModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user)
    if (user.RoleId == null) {
      user.RoleId = "680fc6610ea85ca06eeca35b";
    }
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('RoleId', 'RoleName');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;

    // Convert the string to a valid MongoDB ObjectId
    const roleId = "67d679fb45044b166b2fc8ec";

    // Check if the roleId is a valid ObjectId
    let query = {};
    try {
      if (ObjectId.isValid(roleId)) {
        query = { RoleId: new ObjectId(roleId) };
      } else {
        query = { RoleId: roleId };
      }
    } catch (err) {
      console.log("Error converting to ObjectId:", err);
      query = { RoleId: roleId };
    }

    const users = await User.find(query);
    console.log(users);

    if (users.length === 0) {
      return res.status(404).send('Admin not found');
    }

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};



exports.getUserRole = async (req, res) => {
  try {
    // Find the user by ID and populate the RoleId field to get role details
    const user = await User.findById(req.params.id).populate("RoleId");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if RoleId exists and is populated
    if (!user.RoleId) {
      return res.status(404).send({ message: "Role not found for this user" });
    }

    // Return the role name
    res.status(200).send({ roleName: user.RoleId.RoleName });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.saveFCMToken = async (req, res) => {
  try {
    const { userId, fcmToken } = req.body;

    if (!userId || !fcmToken) {
      return res
        .status(400)
        .json({ error: "User ID and FCM Token are required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fcmToken },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "FCM Token saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdminStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    
    if (!userId || status === undefined) {
      return res.status(400).json({ message: "User ID and status are required" });
    }
    
    const user = await User.findById(userId);
    if (user) {
      user.status = status;
      await user.save();
    }

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin status updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
