const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Date,
        required: true
    },
    dose: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Medicine', medicineSchema);
