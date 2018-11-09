const SalesOrder = require('../models').SalesOrder;
const SalesOrderItem = require('../models').SalesOrderItem;
const _ = require("lodash");


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

    let filter = _.omit(req.query, ["sort", "limit", "offset", "fields"]);
    //let fields = ["salesOrderNumber","statusId","customerId","billToaddressId","shipToAddressId","shipMethodId","subTotal","taxAmount","freightDue","grandTotal","shippingDate"];
    let fields;
    if(req.query.fields) {
       fields = (req.query.fields).split(",");
       console.log(fields);
    };
    return SalesOrder
      .findAll({
        attributes: fields || null,
        where: null,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0,
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
