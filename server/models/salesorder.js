'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesOrder = sequelize.define('SalesOrder', {
    salesOrderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    billToAddressId: DataTypes.INTEGER,
    shipToAddressId: DataTypes.INTEGER,
    shipMethodId: DataTypes.INTEGER,
    subTotal: DataTypes.DOUBLE,
    taxAmount: DataTypes.DOUBLE,
    freightDue: DataTypes.DOUBLE,
    grandTotal: DataTypes.DOUBLE,
    shippingDate: DataTypes.DATE
  }, {});
  SalesOrder.associate = (models) => {
    // associations can be defined here
    SalesOrder.hasMany(models.SalesOrderItem, {
      foreignKey: "salesOrderId",
      as: "orderLines" 
    });
  };
  return SalesOrder;
};