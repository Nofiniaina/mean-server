const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['attente', 'confirmée', 'annulée'],
        default: 'attente',
    },
    details: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);