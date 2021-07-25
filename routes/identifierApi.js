const express = require('express');
const router = express.Router();
const Identifier = require('../models/identifierSchema');


// get all Identifier
router.get('/identifiers', async(req, res) => {
    const identifiers = await Identifier.find({});
    res.json(identifiers);
})

// get identifier by id
router.get('/identifiers/:id', async(req, res) => {
    const identifier = await Identifier.findById(req.params.id);
    res.json(identifier);
})

// add Identifier
router.post('/identifiers', async(req, res) => {
    const newidentifier = await Identifier.create(req.body);
    res.json(newidentifier);
})

// modify Identifier by id
router.put('/customers/:id', async(req, res) => {
    const updatedIdentifier = await Identifier.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedIdentifier);
})

// delete Identifier
router.delete('/identifiers/:id', async(req, res) => {
    const deletedIdentifier = await Identifier.findByIdAndDelete(req.params.id);
    res.json({message: 'Identifier deleted successfully'});
})

// Affect customer to identifier
router.put('/identifiers/affect/:idIdentifier/:idCustomer', async(req, res) => {
    const updatedIdentiferCustomer = await Identifier.findByIdAndUpdate(req.params.idIdentifier, {customer: req.params.idCustomer}, {new: true});
    res.json(updatedIdentiferCustomer);
})

// DesAffect customer
router.put('/identifiers/desAffect/:idIdentifier', async(req, res) => {
    const updatedIdentiferCustomer = await Identifier.findByIdAndUpdate(req.params.idIdentifier, {customer: null}, {new: true});
    res.json(updatedIdentiferCustomer);
})

// GetAllIdentifers with Customer
router.get('/identifiersWithCustomer', async(req, res) => {
    const identifiersWithCustomer = await Identifier.find({}).populate({path: 'customer', select: 'name age gender -_id'});
    res.json(identifiersWithCustomer);
})

module.exports = router;