const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.post("/createService", serviceController.createService);
router.post(
  "/:serviceId/addMecanicien",
  serviceController.addMecanicienToService
);
router.post("/:serviceId/addPiece", serviceController.addPieceToService);
router.get("/", serviceController.getAllServices);
router.get("/:serviceId", serviceController.getServiceById);
router.get("/:clientId/clientService", serviceController.getServiceByClientId);
router.post("/:serviceId/updateStatus", serviceController.updateServiceStatus);
module.exports = router;
