const { Sequelize } = require('sequelize');

// MySQL configuration
const sequelize = new Sequelize('bank_hr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = {sequelize};