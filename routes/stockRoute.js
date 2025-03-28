const stockController = require('../controllers/stockController');
const express = require('express');
const router = express.Router();

router.get('/', stockController.getAllStock);
router.post('/add', stockController.addStock);
router.delete('/deleteStock/:id', stockController.deleteStock);

module.exports = router;
