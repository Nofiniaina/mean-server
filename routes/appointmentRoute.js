const appointmentController = require("../controllers/appointmentController");
const express = require("express");
const router = express.Router();

router.get("/", appointmentController.getAllAppointments);
router.get(
  "/getAppointmentById/:id",
  appointmentController.getAllAppointmentsById
);
router.post("/create", appointmentController.createAppointment);
router.get("/getAppointment/:id", appointmentController.getAppointmentByUserId);
router.post(
  "/updateStatusAppointment/:id",
  appointmentController.updateStatusAppointment
);
module.exports = router;
