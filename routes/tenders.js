const express = require('express');
const router = express.Router();
const Tender = require('../models/tender');
const Offer = require('../models/offers');

// Strona główna
router.get('/', (req, res) => {
  res.render('home', { message: 'Aplikacja do obsługi przetargów' });
});

// Lista przetargów
router.get('/tenders', async (req, res) => {
  const tenders = await Tender.findAll();
  res.render('tenders', { tenders });
});

// Szczegóły przetargu
router.get('/tenders/:id', async (req, res) => {
  const tender = await Tender.findByPk(req.params.id);
  res.render('tender-details', { tender });
});

// Formularz składania oferty
router.post('/tenders/:id/offer', async (req, res) => {
  const tender = await Tender.findByPk(req.params.id);
  const currentTime = new Date();

  if (currentTime >= tender.start_time && currentTime <= tender.end_time) {
    await Offer.create({
      bidder_name: req.body.bidder_name,
      offer_amount: req.body.offer_amount,
      offer_time: currentTime,
      tender_id: tender.id,
    });
    res.redirect(`/tenders/${tender.id}`);
  } else {
    res.send('Przetarg jest zakończony lub jeszcze się nie rozpoczął.');
  }
});

module.exports = router;
