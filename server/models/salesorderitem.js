'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesOrderItem = sequelize.define('SalesOrderItem', {
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: DataTypes.INTEGER,
    orderQty: DataTypes.INTEGER,
    sentQuantity: DataTypes.INTEGER,
    invoiceQuantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DOUBLE,
    unitCost: DataTypes.DOUBLE,
    unitTax: DataTypes.DOUBLE,
    lineTotal: {
      type: DataTypes.DOUBLE,
      set() {
        const orderQty = this.getDataValue("orderQty");
        const unitPrice = this.getDataValue("unitPrice");
        this.setDataValue("lineTotal", orderQty * unitPrice)
      },
    },   
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