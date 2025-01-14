const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ReimbursementRequest = sequelize.define('ReimbursementRequest', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
      defaultValue: 'Pending',
    },
  });

  return ReimbursementRequest;
};