const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/database.js');


const Przetarg = sequelize.define('Przetarg', {
    nazwa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_rozpoczecia: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_zakonczenia: {
        type: DataTypes.DATE,
        allowNull: false
    },
    max_wartosc: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    // Niestandardowa nazwa tabeli
    tableName: 'Przetarg'
});

module.exports = Przetarg;

sequelize.sync({ force: true })
    .then(() => {
        console.log('Baza danych została zsynchronizowana.');
        return Przetarg.bulkCreate([
            {
                nazwa: 'Przetarg 1',
                opis: 'Opis przetargu 1',
                data_rozpoczecia: new Date(),
                data_zakonczenia: new Date(),
                max_wartosc: 1000.00
            }
        ]);
    })
    .then(() => {
        console.log('Dane zostały dodane.');
    })
    .catch(err => {
        console.error('Błąd podczas synchronizacji bazy danych:', err);
    });
