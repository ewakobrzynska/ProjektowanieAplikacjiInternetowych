const Oferta = require('../models/oferta');

// Dodawanie nowej oferty do bazy danych
exports.dodajOferte = (nazwa, wartosc, czas, callback) => {
    const nowaOferta = new Oferta({
        nazwa: nazwa,
        wartosc: wartosc,
        czas: czas
    });

    nowaOferta.save((err, oferta) => {
        if (err) {
            return callback('Wystąpił problem z zapisaniem oferty do bazy danych');
        }
        callback(null, oferta);
    });
};

// Pobieranie wszystkich ofert z bazy danych
exports.pobierzOferty = (callback) => {
    Oferta.find({}, (err, oferty) => {
        if (err) {
            return callback('Wystąpił problem z pobraniem ofert z bazy danych');
        }
        callback(null, oferty);
    });
};
