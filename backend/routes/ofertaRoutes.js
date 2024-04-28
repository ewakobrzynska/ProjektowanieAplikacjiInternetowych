const express = require('express');
const router = express.Router();
const ofertaController = require('../controllers/ofertaController');

// Endpointy dla ofert
router.post('/skladaj', ofertaController.skladajOferte);

// Eksportowanie routera
module.exports = router;
