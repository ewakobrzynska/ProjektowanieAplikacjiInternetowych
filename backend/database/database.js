const { Sequelize } = require('sequelize');

// Utwórz nową instancję Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite', // Ustawienie dialektu na SQLite
    storage: 'database.sqlite' // Nazwa pliku bazy danych
});

// Testuj połączenie z bazą danych
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Połączenie z bazą danych zostało ustanowione pomyślnie.');
    } catch (error) {
        console.error('Błąd podczas łączenia z bazą danych:', error);
    }
}

module.exports = { sequelize, testConnection };
