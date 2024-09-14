const express = require('express');
const app = express();
const router = express.Router();
const { Tender, Offer } = require('./models');
const moment = require('moment');
const { Op } = require('sequelize');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.render('home', { content: 'Aplikacja umożliwia ogłaszanie i przeglądanie przetargów.' });
});

app.get('/tenders', async (req, res) => {
  const tenders = await Tender.findAll({
    where: {
      end_time: {
        [Op.gte]: new Date() 
      }
    }
  });
  res.render('tenders', { tenders, moment });
});

app.get('/tenders/:id', async (req, res) => {
  const tender = await Tender.findByPk(req.params.id);
  if (!tender) {
    res.status(404).send('Tender not found');
  } else {
    res.render('tender-modal', { tender, moment });
  }
});

app.get('/closed-tenders', async (req, res) => {
  const closedTenders = await Tender.findAll({
    where: {
      end_time: {
        [Op.lt]: new Date() 
      }
    }
  });
  res.render('closedTenders', { closedTenders, moment });
});

app.get('/closed-tenders/:id', async (req, res) => {
  const closedTender = await Tender.findByPk(req.params.id);
  if (!closedTender) {
    res.status(404).send('Tender not found');
  } else {
    const offers = await Offer.findAll({
      where: {
        tender_id: closedTender.id
      },
      order: [['offer_amount', 'ASC']]
    });

    const validOffers = offers.filter(offer => offer.offer_amount <= closedTender.max_budget);

    if (validOffers.length === 0) {
      res.render('closedTenderDetails', { closedTender, message: 'Przetarg zakończony bez rozstrzygnięcia. Wszystkie oferty przekraczają budżet.' });
    } else {
      res.render('closedTenderDetails', { closedTender, offers: validOffers, message: '' });
    }
  }
});

app.get('/add-tender', (req, res) => {
  res.render('addTender', { layout: 'layout' });
});

app.post('/add-tender', async (req, res) => {
  const { title, description, institution, start_time, end_time, max_budget } = req.body;
  try {
    await Tender.create({ title, description, institution, start_time, end_time, max_budget });
    res.redirect('/tenders');
  } catch (err) {
    console.error('Błąd podczas dodawania przetargu:', err);
    res.status(500).send('Wystąpił błąd.');
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Wystąpił błąd.');
});

router.get('/tenders/:id/offer', (req, res) => {
  const tenderId = req.params.id;
  res.render('offer-form', { tenderId });
});

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

const sequelize = require('./config/database');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Baza danych została zsynchronizowana.');

    app.listen(3000, () => {
      console.log('Serwer działa na http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Błąd synchronizacji bazy danych:', err);
  });