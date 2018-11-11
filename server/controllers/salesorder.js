const SalesOrder = require('../models').SalesOrder;
const SalesOrderItem = require('../models').SalesOrderItem;
const _ = require("lodash");
const Op = require("sequelize").Op;





module.exports = {
  create(req, res) {
    console.log(req.body.orderLines);
    return SalesOrder
      .create({
        salesOrderNumber: req.body.salesOrderNumber,
        statusId: req.body.statusId,
        customerId: req.body.customerId,
        billToAddressId: req.body.billToAddressId,
        shipToAddressId: req.body.shipToAddressId,
        shipMethodId: req.body.shipMethodId,
        subTotal: req.body.subTotal,
        taxAmount: req.body.taxAmount,
        freightDue: req.body.freightDue,
        grandTotal: req.body.grandTotal,
        shippingDate: req.body.shippingDate,
        orderLines: req.body.orderLines,
      }, {
          include: [{
            model: SalesOrderItem,
            as: "orderLines"
          }]
        })
      .then(salesOrder => res.status(201).send(salesOrder))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    let saleOrderfields = ["id", "salesOrderNumber", "statusId", "customerId", "billToaddressId", "shipToAddressId", "shipMethodId", "subTotal", "taxAmount", "freightDue", "grandTotal", "shippingDate"];
    let filter = _.omit(req.query, ["sort", "limit", "offset", "fields"]);
    let sortOrder = ["id", "ASC"];
    let associations = {
      model: SalesOrderItem,
      as: 'orderLines',
    };
    if (req.query.sort) {
      sortOrder = (req.query.sort).split(":");
    }
    if (req.query.fields) {
      saleOrderfields = (req.query.fields).split(",");
      saleOrderfields = _.pull(saleOrderfields, "orderLines");
    };
    if (req.query.fields) {
      if (!req.query.fields.orderLines) {
        associations = [];
        console.log("Truthy")
      };
    };

    console.log(associations);
    return SalesOrder
      .findAll({
        attributes: saleOrderfields,
        where: filter || null,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0,
        order: [sortOrder],
        // include:  [{
        //   model: SalesOrderItem,
        //   as: 'orderLines',
        // }],

        include: associations,


      })
      .then(salesOrder => res.status(200).send(salesOrder))
      .catch(error => res.status(400).send(error));
  },

  //Find one sales orders

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

  // Update a Sales Order

  update(req, res) {
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
        return salesOrder
          .update({
            salesOrderNumber: req.body.salesOrderNumber,
            statusId: req.body.statusId,
            customerId: req.body.customerId,
            billToAddressId: req.body.billToAddressId,
            shipToAddressId: req.body.shipToAddressId,
            shipMethodId: req.body.shipMethodId,
            subTotal: req.body.subTotal,
            taxAmount: req.body.taxAmount,
            freightDue: req.body.freightDue,
            grandTotal: req.body.grandTotal,
            shippingDate: req.body.shippingDate

          })
          .then(() => res.status(200).send(salesOrder))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return SalesOrder
      .findById(req.params.salesOrderId)
      .then(salesOrder => {
        if (!salesOrder) {
          return res.status(400).send({
            message: 'Sales Order Not Found',
          });
        }
        return salesOrder
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
