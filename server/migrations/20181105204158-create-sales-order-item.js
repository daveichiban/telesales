'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SalesOrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salesOrderId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "SalesOrders",
          key: "id"
        }
      },
      productId: {
        type: Sequelize.INTEGER
      },
      orderQty: {
        type: Sequelize.INTEGER
      },
      sentQuantity: {
        type: Sequelize.INTEGER
      },
      invoiceQuantity: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.DOUBLE
      },
      unitCost: {
        type: Sequelize.DOUBLE
      },
      unitTax: {
        type: Sequelize.DOUBLE
      },
      lineTotal: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('SalesOrderItems');
  }
};