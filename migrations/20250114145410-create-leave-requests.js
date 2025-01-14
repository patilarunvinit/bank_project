'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LeaveRequests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      leaveType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Casual Leave',
      },
      leaveBalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
        defaultValue: 'Pending',
      },
      dayDiff: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LeaveRequests');
  },
};