const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

// get all users
router.get('/users', async(req, res) => {
    const users = await  User.find({});
    res.json(users);
})

// get user by son id
router.get('/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

//  ajouter un nouveau utilisateurs 
router.post('/users', async(req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
})

// modifier un utilisateurs
router.put('/users/:id', async(req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedUser);
})

// delete user 
router.delete('/users/:id', async(req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'user deleted successfully'});
})

module.exports = router;