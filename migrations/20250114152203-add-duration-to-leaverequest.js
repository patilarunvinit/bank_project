'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LeaveRequests', 'dayDiff', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null if you plan to update it later
      defaultValue: 0, // Default value for the field
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LeaveRequests', 'dayDiff');
  }
};