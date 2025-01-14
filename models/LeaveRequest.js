const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LeaveRequest = sequelize.define('LeaveRequest', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Casual Leave',
    },
    leaveBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, 
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
      defaultValue: 'Pending',
    },

    dayDiff: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: 0, 
    },
  });

  return LeaveRequest;
};
