const { Sequelize } = require('sequelize');

// Połączenie z bazą danych SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Lokalizacja pliku bazy danych
});

module.exports = sequelize;
