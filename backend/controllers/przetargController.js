const Przetarg = require('../models/przetarg');

// Obsługa zapytania GET dla listy przetargów

exports.getPrzetargi = async (req, res) => {
    try {
        const przetargi = await Przetarg.findAll();
        res.json(przetargi);
    } catch (error) {
        console.error('Błąd podczas pobierania przetargów:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania przetargów.' });
    }
};

// Obsługa zapytania POST dla dodawania przetargu
exports.dodajPrzetarg = async (req, res) => {
    try {
        // Pobranie danych z formularza
        const { nazwa, opis, data_rozpoczecia, data_zakonczenia, max_wartosc } = req.body;

        // Dodanie przetargu do bazy danych
        await Przetarg.create({
            nazwa,
            opis,
            data_rozpoczecia,
            data_zakonczenia,
            max_wartosc
        });

        // Odpowiedź z potwierdzeniem dodania przetargu
        res.status(200).json({ message: 'Przetarg został dodany pomyślnie.' });
    } catch (error) {
        console.error('Błąd podczas dodawania przetargu:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas dodawania przetargu.' });
    }
};

