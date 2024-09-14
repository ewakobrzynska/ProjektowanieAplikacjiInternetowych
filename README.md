# Aplikacja do obsługi przetargów

## Opis projektu

Aplikacja umożliwia tworzenie przetargów, składanie ofert na przetargi oraz wyświetlanie listy otwartych i zakończonych przetargów. System obsługuje przetargi w czasie rzeczywistym, pozwalając użytkownikom na dodawanie ofert w określonych ramach czasowych przetargu.

## Funkcjonalności

- Tworzenie nowych przetargów (wraz z podaniem tytułu, opisu, instytucji zamawiającej, budżetu oraz dat rozpoczęcia i zakończenia).
- Wyświetlanie listy aktywnych i zakończonych przetargów.
- Składanie ofert w ramach otwartych przetargów.
- Przeglądanie szczegółowych informacji o przetargach i ofertach.

## Technologie

Projekt został zbudowany z użyciem:

- **Node.js** - Środowisko uruchomieniowe JavaScript.
- **Express.js** - Framework do tworzenia aplikacji webowych w Node.js.
- **Sequelize** - ORM do zarządzania bazą danych.
- **SQLite** - Relacyjna baza danych używana do przechowywania danych przetargów i ofert.
- **EJS (Embedded JavaScript)** - Silnik szablonów HTML.
- **Bootstrap** - Framework CSS do stylizacji interfejsu użytkownika.

## Instalacja

Aby uruchomić projekt lokalnie, wykonaj poniższe kroki:

1. **Klonowanie repozytorium:**

   ```bash
   git clone https://github.com/ewakobrzynska/ProjektowanieAplikacjiInternetowych
   ```

2. **Zainstaluj wymagane zależności:**

   ```bash
   cd tender-system
   npm install
   ```

3. **Utwórz bazę danych SQLite:**

   Aplikacja domyślnie używa bazy danych SQLite. W pliku `config/database.js` znajduje się konfiguracja bazy danych, która zapisuje dane do pliku `database.sqlite`.

4. **Uruchom aplikację:**

   ```bash
   npm start
   ```

5. Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Modele danych

### Tender (Przetarg)

- `title` (string) - Tytuł przetargu.
- `description` (text) - Opis przedmiotu przetargu.
- `institution` (string) - Instytucja zamawiająca.
- `start_time` (date) - Data rozpoczęcia przetargu.
- `end_time` (date) - Data zakończenia przetargu.
- `max_budget` (decimal) - Maksymalny budżet przetargu.
- `is_ongoing` (boolean) - Flaga wskazująca, czy przetarg jest otwarty.

### Offer (Oferta)

- `tender_id` (integer) - ID przetargu, do którego oferta została złożona.
- `bidder_name` (string) - Nazwa składającego ofertę.
- `offer_amount` (decimal) - Wartość oferty.
- `offer_time` (date) - Data złożenia oferty.

## Użycie

### Tworzenie nowego przetargu

Aby dodać nowy przetarg, przejdź do zakładki **Dodaj przetarg** i wypełnij formularz, podając szczegóły przetargu, takie jak tytuł, opis, daty rozpoczęcia i zakończenia oraz maksymalny budżet.

### Składanie oferty

Po przejściu do szczegółów otwartego przetargu, użytkownik może złożyć ofertę, wypełniając formularz z nazwą oferenta i kwotą oferty. Oferty mogą być składane tylko w okresie trwania przetargu.

### Przeglądanie przetargów

Na stronie głównej aplikacji dostępne są linki do:

- Listy aktualnych przetargów.
- Listy zakończonych przetargów, gdzie można zobaczyć szczegóły dotyczące zakończonych przetargów i złożonych ofert.

## Przykłady

### Przykład tworzenia przetargu:

1. Wybierz zakładkę **Dodaj przetarg**.
2. Wypełnij pola:
   - Tytuł przetargu: np. "Dostawa sprzętu IT".
   - Opis przetargu: np. "Zakup komputerów i monitorów".
   - Instytucja: np. "Urząd Miasta".
   - Data rozpoczęcia i zakończenia.
   - Maksymalny budżet.

3. Kliknij przycisk "Dodaj przetarg".

### Przykład składania oferty:

1. Wybierz przetarg z listy otwartych przetargów.
2. Kliknij "Złóż ofertę".
3. Wprowadź nazwę oferenta i kwotę oferty.
4. Kliknij "Złóż ofertę".

## Wymagania systemowe

- **Node.js** w wersji 14.x lub nowszej.
- **npm** w wersji 6.x lub nowszej.

