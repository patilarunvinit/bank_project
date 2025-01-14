const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.STRING,
    },
    job_location: {
      type: DataTypes.STRING,
    },
    reporting_manager: {
      type: DataTypes.STRING,
    },
    joining_date: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};