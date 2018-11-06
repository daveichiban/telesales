const salesOrderController = require('../controllers').salesOrder;
const salesOrderItemController = require('../controllers').salesOrderItem;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/salesorders', salesOrderController.create);
  app.post('/api/salesorders/:salesOrderId/salesorderitems', salesOrderItemController.create);

};