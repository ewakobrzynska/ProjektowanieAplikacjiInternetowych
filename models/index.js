const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model dla tabeli `tenders`
const Tender = sequelize.define('Tender', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  institution: {
    type: DataTypes.STRING
  },
  start_time: {
    type: DataTypes.DATE
  },
  end_time: {
    type: DataTypes.DATE
  },
  max_budget: {
    type: DataTypes.DECIMAL(10, 2)
  },
      is_ongoing: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
  }
});

// Model dla tabeli `offers`
const Offer = sequelize.define('Offer', {
  tender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tender,
      key: 'id'
    }
  },
  bidder_name: {
    type: DataTypes.STRING
  },
  offer_amount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  offer_time: {
    type: DataTypes.DATE
  }
});

// Relacje
Tender.hasMany(Offer, { foreignKey: 'tender_id' });
Offer.belongsTo(Tender, { foreignKey: 'tender_id' });

// Eksport modeli
module.exports = { Tender, Offer };
