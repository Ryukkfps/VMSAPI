const Home = require('../models/homeModel');

// Create a new home
exports.createHome = async (req, res) => {
  try {
    const { UserId, SId, BId, UId } = req.body;

    // Check if a home with the same UserId, SId, BId, and UId already exists
    const existingHome = await Home.findOne({ UserId, SId, BId, UId });

    if (existingHome) {
      return res.status(409).send('A home with the same details already exists');
    }

    // Create a new home
    const home = new Home(req.body);
    await home.save();

    // Find admin users to notify
    const User = require('../models/userModel');
    const Notification = require('../models/notificationModel');
    
    // Find society admins
    const admins = await User.find({ 
      SId: SId, 
      RoleId: "67d679fb45044b166b2fc8ec", // Admin role ID
      fcmToken: { $exists: true, $ne: null }
    });

    // Create notifications for admins
    const notificationPromises = admins.map(admin => {
      return new Notification({
        requestId: home._id,
        requestType: 'homeRegistration', // Add this line to specify the request type
        userId: admin._id,
        NotificationTitle: "Home Registration Request",
        NotificationBody: `A new home registration requires your approval.`
      }).save();
    });

    await Promise.all(notificationPromises);

    // Send FCM notifications if possible
    if (admins.length > 0 && require('../firebase')) {
      const admin = require('../firebase');
      const fcmTokens = admins.map(user => user.fcmToken).filter(Boolean);
      
      if (fcmTokens.length > 0) {
        const message = {
          notification: {
            title: "Home Registration Request",
            body: "A new home registration requires your approval."
          },
          tokens: fcmTokens
        };

        admin.messaging().sendEachForMulticast(message)
          .then(response => console.log("FCM Notification sent successfully"))
          .catch(error => console.error("Error sending FCM notification:", error));
      }
    }

    res.status(201).send(home);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


// Get all homes
exports.getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).send(homes);
  } catch (error) {
    res.status(500).send(error);
  }
};



// Get a single home by ID
exports.getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getHomebyUserId = async (req, res) => {
  try {
    const home = await Home.find({ UserId: req.params.id })
      .populate('UserId', 'Name') // Populate the User document and select the 'Name' field
      .populate('SId', 'SocietyName') // Populate the Society document and select the 'SocietyName' field
      .populate('BId', 'BlockName') // Populate the Block document and select the 'BlockName' field
      .populate('UId', 'FlatNumber') // Populate the Unit document and select the 'FlatNumber' field
      .populate('OwnershipType', 'TypeName') // Populate the OwnershipType document and select the 'TypeName' field
      .populate('OccupancyStatus', 'OSName'); // Populate the OccupancyStatus document and select the 'OSName' field

    if (!home || home.length === 0) {
      return res.status(404).send('No homes found for the given user ID');
    }

    // Concatenate the names
    // const concatenatedNames = home.map(h => {
    //   return {
    //     id: h._id,
    //     User: h.UserId.Name,
    //     Society: h.SId.SocietyName,
    //     Block: h.BId.BlockName,
    //     Unit: h.UId.FlatNumber,
    //     OwnershipType: h.OwnershipType.TypeName,
    //     OccupancyStatus: h.OccupancyStatus.OSName,
    //   };
    // });
    
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Update a home
exports.updateHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateHomeStatus = async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get homes by societyID whose status is false
exports.getHomesBySocietyIdAndStatusFalse = async (req, res) => {
  try {
    const societyId = req.params.id;
    console.log(societyId);
    const homes = await Home.find({ SId: societyId, status: false })
      .populate('UserId', 'Name')
      .populate('SId', 'SocietyName')
      .populate('BId', 'BlockName')
      .populate('UId', 'FlatNumber')
      .populate('OwnershipType', 'TypeName')
      .populate('OccupancyStatus', 'OSName');

    if (!homes || homes.length === 0) {
      return res.status(404).send('No homes found for the given society ID with status false');
    }
    res.status(200).send(homes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a home
exports.deleteHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);
    if (!home) {
      return res.status(404).send();
    }
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send(error);
  }
};
