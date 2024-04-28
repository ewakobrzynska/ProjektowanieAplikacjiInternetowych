const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000; // lub inny port, który chcesz użyć
const Przetarg = require('./backend/models/przetarg');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Dla plików statycznych (np. HTML, CSS, JS)

app.use(express.static(path.join(__dirname, 'frontend')));

// Obsługa żądania GET dla głównej ścieżki "/"
app.get('/', (req, res) => {
    // Serwowanie pliku index.html z katalogu publicznego
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/dodaj_przetarg', async (req, res) => {
    try {
        // Pobranie danych przetargu z ciała żądania
        const { nazwa, opis, data_rozpoczecia, data_zakonczenia, max_wartosc } = req.body;

        // Tutaj możesz dodać kod do dodawania przetargu do bazy danych
        await Przetarg.create({
            nazwa,
            opis,
            data_rozpoczecia,
            data_zakonczenia,
            max_wartosc
        });

        // Jeśli dodawanie przetargu zakończyło się sukcesem, możesz odpowiedzieć sukcesem
        res.status(200).json({ message: 'Przetarg został dodany pomyślnie.' });
    } catch (error) {
        // Jeśli wystąpił błąd podczas dodawania przetargu, możesz odpowiedzieć błędem
        console.error('Błąd podczas dodawania przetargu:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas dodawania przetargu. Spróbuj ponownie.' });
    }
});

// Routing
const przetargiRouter = require('./backend/routes/przetargRoutes');
app.use('/api/przetargi', przetargiRouter); // Endpointy związane z przetargami


// Start serwera
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

console.log('Aplikacja dostępna pod adresem: http://localhost:' + PORT);

