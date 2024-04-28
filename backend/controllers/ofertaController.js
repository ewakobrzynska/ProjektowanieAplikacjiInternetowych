const Oferta = require('../models/oferta');

// Obsługa zapytania POST dla składania oferty w przetargu
exports.skladajOferte = (req, res) => {
    const { nazwa, wartosc } = req.body;

    const nowaOferta = new Oferta({
        nazwa: nazwa,
        wartosc: wartosc,
        czas: new Date()
    });

    nowaOferta.save((err, oferta) => {
        if (err) {
            return res.status(500).json({ message: 'Wystąpił problem z zapisaniem oferty' });
        }
        res.status(201).json(oferta);
    });
};
