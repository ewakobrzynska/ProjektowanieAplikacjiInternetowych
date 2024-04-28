const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Oferta = sequelize.define('Oferta', {
    nazwa_przetargu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wartosc: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    czas: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Oferta;
sequelize.sync({ force: true })
    .then(() => {
        console.log('Baza danych została zsynchronizowana.');
    });
