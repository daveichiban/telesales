const SalesOrder = require('../models').SalesOrder;
const SalesOrderItem = require('../models').SalesOrderItem;
const _ = require("lodash");
const Op = require("sequelize").Op;


function includeOrderLines(str) {
  if (str && !str.includes("orderLines")) {
    console.log("No order lines")
    return [];
  } else {
    return {
      model: SalesOrderItem,
      as: 'orderLines',
    };
  }
};

function fieldSelector(str) {
  let saleOrderfields;
  if (str) {
    saleOrderfields = (str).split(",");
    saleOrderfields = _.pull(saleOrderfields, "orderLines");
  } else {
    saleOrderfields = ["id", "salesOrderNumber", "statusId", "customerId", "billToaddressId", "shipToAddressId", "shipMethodId", "subTotal", "taxAmount", "freightDue", "grandTotal", "shippingDate"];
  };
  return saleOrderfields;
};




module.exports = {
  create(req, res) {
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
    let filter = _.omit(req.query, ["sort", "limit", "offset", "fields"]);
    let sortOrder = ["id", "ASC"];
    if (req.query.sort) {
      sortOrder = (req.query.sort).split(":");
    }

    let saleOrderfields = fieldSelector(req.query.fields);
    //Check to include Orderlines
    let associations = includeOrderLines(req.query.fields);

    let cleanFilters = _.mapValues(filter, (value) => {
      if (value.includes("gt") || value.includes("lt")) {
        value = value
          .replace(/gt(?!e)/, "\"gt\"")
          .replace("gte", "\"gte\"")
          .replace(/lt(?!e)/, "\"lt\"")
          .replace("lte", "\"lte\"")
        console.log(value);
        return JSON.parse(`{${value}}`)
      } else {
        return value;
      }
    })
    return SalesOrder
      .findAll({
        attributes: saleOrderfields,
        where: cleanFilters,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0,
        order: [sortOrder],
        include: associations,
      })
      .then(salesOrder => res.status(200).send(salesOrder))
      .catch(error => res.status(400).send(error));
  },

  //Find one sales orders

  retrieve(req, res) {
    let saleOrderfields = fieldSelector(req.query.fields);
    let associations = includeOrderLines(req.query.fields);
    return SalesOrder
      .findById(req.params.salesOrderId, {
        attributes: saleOrderfields,
        include: associations,
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
