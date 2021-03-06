'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SalesOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salesOrderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      billToAddressId: {
        type: Sequelize.INTEGER
      },
      shipToAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shipMethodId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subTotal: {
        type: Sequelize.DOUBLE
      },
      taxAmount: {
        type: Sequelize.DOUBLE
      },
      freightDue: {
        type: Sequelize.DOUBLE
      },
      grandTotal: {
        type: Sequelize.DOUBLE
      },
      shippingDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SalesOrders');
  }
};