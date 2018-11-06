const SalesOrderItem = require('../models').SalesOrderItem;

module.exports = {
  create(req, res) {
    return SalesOrderItem
      .create({
        salesOrderId: req.params.salesOrderId,  
        productId: req.body.productId,
      })
      .then(salesOrderItem => res.status(201).send(salesOrderItem))
      .catch(error => res.status(400).send(error));
  },
};
