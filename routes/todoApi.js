const express = require('express');
const router = express.Router();
const Todo = require('../models/todoSchema');

// get all todo
router.get('/todos', async(req, res) => {
    const todos = await  Todo.find({});
    res.json(todos);
})

// get todo by id
router.get('/todos/:idTodo', async(req, res) => {
    const todo = await Todo.findById(req.params.idTodo);
    res.json(todo);
})

// add todo
router.post('/todos', async(req, res) => {
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
})

// modify todo by id
router.put('/todos/:idTodo', async(req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.idTodo, req.body, {new: true});
    res.json(updatedTodo);
})

// delete todo
router.delete('/todos/:idTodo', async(req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.idTodo);
    res.json({message: 'todo deleted sucessfully'});
})

module.exports = router;