'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the `dayDiff` column
    await queryInterface.addColumn('LeaveRequests', 'dayDiff', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Allow null if the field can be calculated later
      defaultValue: 0,  // Default value for the `dayDiff` field
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the `dayDiff` column if we roll back the migration
    await queryInterface.removeColumn('LeaveRequests', 'dayDiff');
  }
};