const express = require('express');
const router = express.Router();
const przetargController = require('../controllers/przetargController');

// Endpointy dla przetargów
router.get('/', przetargController.getPrzetargi);
router.post('/dodaj_przetarg', przetargController.dodajPrzetarg);

// Eksportowanie routera
module.exports = router;
