const SalesOrderItem = require('../models').SalesOrderItem;

module.exports = {
  create(req, res) {
    return SalesOrderItem
      .create({
        salesOrderId: req.params.salesOrderId,  
        productId: req.body.productId,
        orderQty: req.body.orderQty,
        sentQuantity: req.body.sentQuantity,
        invoiceQuantity: req.body.invoiceQuantity,
        unitPrice: req.body.unitPrice,
        unitCost: req.body.unitCost,
        unitTax: req.body.unitTax
        //lineTotal: req.body.lineTotal
      })
      .then(salesOrderItem => res.status(201).send(salesOrderItem))
      .catch(error => res.status(400).send(error));
  },
};
