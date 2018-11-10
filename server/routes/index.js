const salesOrderController = require('../controllers').salesOrder;
const salesOrderItemController = require('../controllers').salesOrderItem;
const brandController = require('../controllers').brand;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/salesorders', salesOrderController.create);
  app.get('/api/salesorders', salesOrderController.list);
  app.get('/api/salesorders/:salesOrderId/', salesOrderController.retrieve);
  app.put('/api/salesorders/:salesOrderId/', salesOrderController.update);
  app.delete('/api/salesorders/:salesOrderId/', salesOrderController.destroy);

  app.post('/api/salesorders/:salesOrderId/salesorderitems', salesOrderItemController.create);

  app.post('/api/brands', brandController.create);

};