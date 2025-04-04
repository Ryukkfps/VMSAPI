const mongoose = require('mongoose');

const permitRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Add timestamps
permitRequestSchema.set('timestamps', true);

const PermitRequest = mongoose.model('PermitRequest', permitRequestSchema);

module.exports = PermitRequest;