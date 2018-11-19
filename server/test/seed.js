const SalesOrder = require('../models').SalesOrder;
const SalesOrderItem = require('../models').SalesOrderItem;
const salesOrder = {
    salesOrderNumber: 12345,
    statusId: 5,
    customerId: 1234,
    billToAddressId: 1,
    shipToAddressId: 1,
    shipMethodId: 5,
    subTotal: 10.00,
    taxAmount: 2.00,
    freightDue: 3.00,
    grandTotal: 15.00
};

const populateSalesOrders = (done) => {
    SalesOrderItem.destroy({ truncate: true })
        .then(() => {
            SalesOrder.destroy({ truncate: { cascade: true } })
        }).then(() => {
            SalesOrder.create(salesOrder)
        }).then(() => done());
};






module.exports = { populateSalesOrders }