const EntryPermit = require('../models/entryPermitModel');
const QRCode = require('qrcode');

// Create a new entry permit and generate a QR code
exports.createEntryPermit = async (req, res) => {
    try {
        const { Name, TimeSpan, UserId, DateTime } = req.body;
        // Create a new entry permit with IST DateTime

        const newDateTime = new Date(DateTime);
        const ISTOffset = 330; // IST is UTC+5:30
        const ISTTime = new Date(newDateTime.getTime() + ISTOffset * 60 * 1000);
        const entryPermit = new EntryPermit({ Name, TimeSpan, DateTime: ISTTime , UserId });
        await entryPermit.save();

        // Generate QR code
        // const qrCodeData = `Name: ${Name}, PassCode: ${entryPermit.PassCode}, DateTime: ${ISTTime}`;
        // const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        // // Update the entry permit with the QR code image source
        // entryPermit.ImageSource = qrCodeImage;
        // await entryPermit.save();

        res.status(201).json(entryPermit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.validateEntryPermit = async (req, res) => {
    try {
        const { passcode } = req.params;

        // Find the entry permit by passcode
        const entryPermit = await EntryPermit.findOne({ PassCode: passcode });

        if (!entryPermit) {
            return res.status(404).json({ valid: false, message: 'Entry permit not found' });
        }

        // Calculate the expiry time in IST
        const ISTOffset = 330; // IST is UTC+5:30
        const currentISTTime = new Date(new Date().getTime() + ISTOffset * 60 * 1000);
        const expiryTime = new Date(entryPermit.DateTime);
        expiryTime.setMinutes(expiryTime.getMinutes() + entryPermit.TimeSpan);

        // Check if the current IST time is past the expiry time
        const isValid = currentISTTime < expiryTime && currentISTTime > entryPermit.DateTime;

        res.status(200).json({ valid: isValid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
