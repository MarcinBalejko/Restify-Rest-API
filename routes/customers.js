const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
  // Get customers
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with an id of ${req.params.id}`
        )
      );
    }
  });

  // Add customer
  server.post('/customers', async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    // Creating customer object
    const { name, email, balance } = req.body;

    const customer = new Customer({
      name,
      email,
      balance
    });

    // Adding customer to db
    try {
      const newCustomer = await customer.save();
      res.send(201); // 201 = everything is ok and sth was created
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
