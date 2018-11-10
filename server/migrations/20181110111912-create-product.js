'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      standardCost: {
        type: Sequelize.DOUBLE
      },
      listPrice: {
        type: Sequelize.DOUBLE
      },
      sellStartDate: {
        type: Sequelize.DATE
      },
      sellEndDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      brandId: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      length: {
        type: Sequelize.DOUBLE
      },
      width: {
        type: Sequelize.DOUBLE
      },
      height: {
        type: Sequelize.DOUBLE
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.STRING
      },
      taxClass: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Products');
  }
};