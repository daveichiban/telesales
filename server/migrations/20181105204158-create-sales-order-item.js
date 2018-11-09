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
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "SalesOrders",
          key: "id"
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderQty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sentQuantity: {
        type: Sequelize.INTEGER
      },
      invoiceQuantity: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unitCost: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unitTax: {
        type: Sequelize.DOUBLE,
        allowNull: false
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