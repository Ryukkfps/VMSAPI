const PermitRequest = require("../models/permitRequestModel");
const Home = require("../models/homeModel"); // Import Home model
const User = require("../models/userModel"); // Import User model
const Notification = require("../models/notificationModel"); // Add this import
const admin = require("../firebase");

// Create a new permit request
exports.createPermitRequest = async (req, res) => {
  try {
    const { name, purpose, unitId, createdby } = req.body;

    const permitRequest = new PermitRequest({
      name,
      purpose,
      unitId,
      status: "pending",
      createdby: createdby
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

    // Create and save notifications for each user
    const notificationPromises = users.map((user) => {
      return new Notification({
        requestId: savedRequest._id,
        requestType: 'permitRequest', // Add this line to specify the request type
        userId: user._id,
        NotificationTitle: "Entry Request",
        NotificationBody: `${name} is at the Gate. \nPurpose of Visit : ${purpose}. \nShall we allow entry?`
      }).save();
    });

    await Promise.all(notificationPromises);

    if (fcmTokens.length > 0) {
      const message = {
        notification: {
          title: "Entry Request",
          body: `${name} is at the Gate. \nPurpose of Visit : ${purpose}. \nShall we allow entry?`,
        },
        tokens: fcmTokens,
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
    
    // Check if status is being updated
    if (status && status !== permitRequest.status) {
      permitRequest.status = status;
      
      // Get the user who created the permit request
      const creator = await User.findById(permitRequest.createdby);
      
      if (creator) {
        // Create notification for the creator
        const notification = new Notification({
          requestId: permitRequest._id,
          requestType: 'permitRequest',
          userId: creator._id,
          NotificationTitle: "Permit Request Update",
          NotificationBody: `Your entry request for ${permitRequest.name} has been ${status}.`
        });
        
        await notification.save();
        
        // Send FCM notification if user has fcmToken
        if (creator.fcmToken) {
          const message = {
            notification: {
              title: "Permit Request Update",
              body: `Your entry request for ${permitRequest.name} has been ${status}.`
            },
            token: creator.fcmToken
          };
          
          admin.messaging().send(message)
            .then(response => console.log("FCM Notification sent successfully:", response))
            .catch(error => console.error("Error sending FCM notification:", error));
        }
      }
    } else if (status) {
      permitRequest.status = status;
    }

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
