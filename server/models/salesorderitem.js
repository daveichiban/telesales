'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesOrderItem = sequelize.define('SalesOrderItem', {
    salesOrderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderQty: DataTypes.INTEGER,
    sentQuantity: DataTypes.INTEGER,
    invoiceQuantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DOUBLE,
    unitCost: DataTypes.DOUBLE,
    unitTax: DataTypes.DOUBLE,
    lineTotal: DataTypes.DOUBLE
  }, {});
  SalesOrderItem.associate = function(models) {
    // associations can be defined here
    SalesOrderItem.belongsTo(models.SalesOrder, {
      foreignKey: "salesOrderId",
      onDelete: "CASCADE"
    });
  };
  return SalesOrderItem;
};