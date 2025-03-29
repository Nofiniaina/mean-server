const appointmentController = require('../controllers/appointmentController');
const express = require('express');
const router = express.Router();

router.get('/', appointmentController.getAllAppointments);
router.post('/create', appointmentController.createAppointment);

module.exports = router;