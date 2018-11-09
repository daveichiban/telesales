const SalesOrder = require('../models').SalesOrder;
const SalesOrderItem = require('../models').SalesOrderItem;

module.exports = {
  create(req, res) {
    return SalesOrder
      .create({
        salesOrderNumber: req.body.salesOrderNumber,
        statusId: req.body.statusId,
        customerId: req.body.customerId,
        billToaddressId: req.body.billToaddressId,
        shipToAddressId: req.body.shipToAddressId,
        shipMethodId: req.body.shipMethodId,
        subTotal: req.body.subTotal,
        taxAmount: req.body.taxAmount,
        freightDue: req.body.freightDue,
        grandTotal: req.body.grandTotal,
        shippingDate: req.body.shippingDate
      })
      .then(salesOrder => res.status(201).send(salesOrder))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return SalesOrder
      .findAll({
        include: [{
          model: SalesOrderItem,
          as: 'orderLines',
        }],
      })
      .then(salesOrder => res.status(200).send(salesOrder))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return SalesOrder
      .findById(req.params.salesOrderId, {
        include: [{
          model: SalesOrderItem,
          as: 'orderLines',
        }],
      })
      .then(salesOrder => {
        if (!salesOrder) {
          return res.status(404).send({
            message: 'Sales Order Not Found',
          });
        }
        return res.status(200).send(salesOrder);
      })
      .catch(error => res.status(400).send(error));
  },
};
