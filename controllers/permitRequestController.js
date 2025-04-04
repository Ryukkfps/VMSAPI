const PermitRequest = require("../models/permitRequestModel");
const Home = require("../models/homeModel"); // Import Home model
const User = require("../models/userModel"); // Import User model
const admin = require("../firebase");

// Create a new permit request
exports.createPermitRequest = async (req, res) => {
  try {
    const { name, purpose, unitId } = req.body;

    const permitRequest = new PermitRequest({
      name,
      purpose,
      unitId,
      status: "pending",
    });

    const savedRequest = await permitRequest.save();

    // Find all users associated with this unitId via Home model
    const homes = await Home.find({ UId: unitId }).populate("UserId");

    // Extract user IDs
    const userIds = homes.map((home) => home.UserId._id);

    // Find users with fcmTokens
    const users = await User.find({
      _id: { $in: userIds },
      fcmToken: { $exists: true, $ne: null },
    });

    // Extract FCM tokens
    const fcmTokens = users.map((user) => user.fcmToken).filter(Boolean);

    if (fcmTokens.length > 0) {
      const message = {
        notification: {
          title: "New Permit Request",
          body: `A new permit request "${name}" has been created.`,
        },
        tokens: fcmTokens, // Send to multiple users
      };

      // Send notification
      admin
        .messaging()
        .sendEachForMulticast(message)
        .then((response) => {
          console.log("FCM Notification sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending FCM notification:", error);
        });
    }

    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all permit requests
exports.getAllPermitRequests = async (req, res) => {
  try {
    const permitRequests = await PermitRequest.find()
      .populate("unitId")
      .sort({ createdAt: -1 });
    res.json(permitRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single permit request by ID
exports.getPermitRequestById = async (req, res) => {
  try {
    const permitRequest = await PermitRequest.findById(req.params.id).populate(
      "unitId"
    );

    if (!permitRequest) {
      return res.status(404).json({ message: "Permit request not found" });
    }

    res.json(permitRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a permit request
exports.updatePermitRequest = async (req, res) => {
  try {
    const permitRequest = await PermitRequest.findById(req.params.id);

    if (!permitRequest) {
      return res.status(404).json({ message: "Permit request not found" });
    }

    const { name, purpose, unitId, status } = req.body;

    if (name) permitRequest.name = name;
    if (purpose) permitRequest.purpose = purpose;
    if (unitId) permitRequest.unitId = unitId;
    if (status) permitRequest.status = status;

    const updatedRequest = await permitRequest.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a permit request
exports.deletePermitRequest = async (req, res) => {
  try {
    const permitRequest = await PermitRequest.findById(req.params.id);

    if (!permitRequest) {
      return res.status(404).json({ message: "Permit request not found" });
    }

    await permitRequest.remove();
    res.json({ message: "Permit request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get permit requests by status
exports.getPermitRequestsByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const permitRequests = await PermitRequest.find({ status })
      .populate("unitId")
      .sort({ createdAt: -1 });
    res.json(permitRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get permit requests by unit
exports.getPermitRequestsByUnit = async (req, res) => {
  try {
    const unitId = req.params.unitId;
    const permitRequests = await PermitRequest.find({ unitId })
      .populate("unitId")
      .sort({ createdAt: -1 });
    res.json(permitRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
