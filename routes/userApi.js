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

// Affect todo
router.put('/users/affect/:idUser/:idTodo', async(req, res) => {
    const updateUserTodo = await User.findByIdAndUpdate(req.params.idUser, {$push: {todos: req.params.idTodo}}, {new: true});
    res.json(updateUserTodo);
})
// DesAffect todo
router.put('/users/desAffect/:idUser/:idTodo', async(req, res) => {
    const updateUserTodo = await User.findByIdAndUpdate(req.params.idUser, {$pull: {todos: req.params.idTodo}}, {new: true});
    res.json(updateUserTodo);
})
// GetAllUsers with all todos
router.get('/usersWithTodos', async(req, res) => {
    const usersWithTodos = await User.find({}).populate({path: 'todos', select: 'name description -_id'});
    res.json(usersWithTodos);
})
module.exports = router;