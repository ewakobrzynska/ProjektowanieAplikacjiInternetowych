// Funkcja do pobierania listy przetargów
function getPretargi() {
    return fetch('/api/przetargi') // Wywołanie endpointu API przetargów
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem z pobraniem listy przetargów');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Błąd:', error);
        });
}

// Funkcja do dodawania nowego przetargu
function dodajPrzetarg(nazwa, opis, dataRozpoczecia, dataZakonczenia, maxWartosc) {
    // Dane przetargu
    const nowyPrzetarg = {
        nazwa: nazwa,
        opis: opis,
        dataRozpoczecia: dataRozpoczecia,
        dataZakonczenia: dataZakonczenia,
        maxWartosc: maxWartosc
    };

    // Wysłanie danych do backendu
    return fetch('/api/dodajPrzetarg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nowyPrzetarg)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem z dodaniem nowego przetargu');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Błąd:', error);
        });
}

// Eksportowanie funkcji dla użycia w innych plikach
export { getPretargi, dodajPrzetarg };
