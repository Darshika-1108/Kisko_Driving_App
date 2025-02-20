const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for collection
const AppointmentSchema = new Schema ({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isTimeSlotAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

// Give name to Collection and export as a model
const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;