const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/inscription", userController.inscription);
router.post("/connexion", userController.connexion);
router.post("/modifUser", userController.modifUser);
router.post("/deleteUser/:id", userController.suppression);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
module.exports = router;
