document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dodaj-przetarg-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Zapobiegamy domyślnemu zachowaniu formularza

        // Pobieramy dane z formularza
        const nazwa = document.getElementById('nazwa').value;
        const opis = document.getElementById('opis').value;
        const data_rozpoczecia = document.getElementById('data-rozpoczecia').value;
        const data_zakonczenia = document.getElementById('data-zakonczenia').value;
        const max_wartosc = document.getElementById('max-wartosc').value;

        // Tworzymy obiekt zawierający dane przetargu
        const przetargData = {
            nazwa: nazwa,
            opis: opis,
            data_rozpoczecia: data_rozpoczecia,
            data_zakonczenia: data_zakonczenia,
            max_wartosc: max_wartosc
        };

        try {
            // Wysyłamy dane za pomocą żądania POST do endpointu /dodaj_przetarg
            const response = await fetch('/api/dodaj_przetarg.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(przetargData)
            });

            // Sprawdzamy, czy żądanie zakończyło się sukcesem
            if (response.ok) {
                // Jeśli tak, przekierowujemy na stronę listy przetargów
                window.location.href = '/lista_przetargow';
            } else {
                // Jeśli nie, wyświetlamy odpowiedni komunikat
                console.error('Błąd podczas dodawania przetargu:', response.statusText);
                alert('Wystąpił błąd podczas dodawania przetargu. Spróbuj ponownie.');
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania danych przetargu:', error);
            alert('Wystąpił błąd podczas dodawania przetargu. Spróbuj ponownie.');
        }
    });

    // Pobieranie listy przetargów przy ładowaniu strony
    getPretargi();
});

// Funkcja do pobierania listy przetargów
function getPretargi() {
    fetch('/api/przetargi') // Wywołanie endpointu API przetargów
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem z pobraniem listy przetargów');
            }
            return response.json();
        })
        .then(przetargi => {
            // Tutaj aktualizujemy tabelę lub inny element DOM z listą przetargów
            console.log('Lista przetargów:', przetargi);
        })
        .catch(error => {
            console.error('Błąd:', error);
        });
}
