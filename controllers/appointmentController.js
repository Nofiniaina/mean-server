const Appointment = require('../models/appointmentModel');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.find();
        res.status(200).json(appointment);
    } catch (error) {
        
    }
}