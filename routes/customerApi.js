const express = require('express');
const router = express.Router();
const Customer = require('../models/customerSchema');


// get all Customers
router.get('/customers', async(req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
})

// get customer by id
router.get('/customers/:idCustomer', async(req, res) => {
    const customer = await Customer.findById(req.params.idCustomer);
    res.json(customer);
})

// add Customer
router.post('/customers', async(req, res) => {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
})

// modify Customer by id
router.put('/customers/:idCustomer', async(req, res) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.idCustomer, req.body, {new: true});
    res.json(updatedCustomer);
})

// delete Customer
router.delete('/customers/:idCustomer', async(req, res) => {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.idCustomer);
    res.json({message: 'Customer deleted successfully'});
})

module.exports = router;