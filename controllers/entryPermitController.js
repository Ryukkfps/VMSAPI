const EntryPermit = require('../models/entryPermitModel');
const Home = require('../models/homeModel');

// Create a new entry permit and generate a QR code
exports.createEntryPermit = async (req, res) => {
    try {
        const { Name, TimeSpan, UserId, DateTime, UId } = req.body;
        // Create a new entry permit with IST DateTime

        const newDateTime = new Date(DateTime);
        const ISTOffset = 330; // IST is UTC+5:30
        const ISTTime = new Date(newDateTime.getTime() + ISTOffset * 60 * 1000);
        const entryPermit = new EntryPermit({ Name, TimeSpan, DateTime: ISTTime , UserId, UId });
        await entryPermit.save();
        res.status(201).json(entryPermit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.validateEntryPermit = async (req, res) => {
    try {
        const { passcode } = req.params;

        // Find the entry permit by passcode
        const entryPermit = await EntryPermit.findOne({ PassCode: passcode }).populate('UserId', 'Name');

        console.log(entryPermit);
        if (!entryPermit) {
            return res.status(404).json({ valid: false, message: 'Entry permit not found' });
        }

        // Find the user's home to get unit information
        const home = await Home.findOne({ UId: entryPermit.UId })
            .populate('UId', 'FlatNumber')
            .populate('BId', 'BlockName')
            .populate('SId', 'SocietyName');

        // Calculate the expiry time in IST
        const ISTOffset = 330; // IST is UTC+5:30
        const currentISTTime = new Date(new Date().getTime() + ISTOffset * 60 * 1000);
        const expiryTime = new Date(entryPermit.DateTime);
        expiryTime.setMinutes(expiryTime.getMinutes() + entryPermit.TimeSpan);

        // Check if the current IST time is past the expiry time
        const isValid = currentISTTime < expiryTime && currentISTTime > entryPermit.DateTime;

        // Prepare response with unit information if available
        const response = {
            valid: isValid,
            unitName: home?.UId?.FlatNumber || 'Unknown',
            blockName: home?.BId?.BlockName || 'Unknown',
            societyName: home?.SId?.SocietyName || 'Unknown',
            name: entryPermit?.UserId?.Name || 'Unknown'
        };

        // const response = {
        //     valid:isValid,
        //     home:home
        // }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
