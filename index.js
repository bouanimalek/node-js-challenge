const express = require('express');
const bodyParser = require('body-parser')
// connect to database 
const connect  = require('./database/connect'); 
// require Models
const User = require('./models/userSchema');
const Todo = require('./models/todoSchema');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => {
  res.json({message : 'Welcome back!'})
})


// get all users
app.get('/users', async(req, res) => {
    const users = await  User.find({});
    res.json(users);
})

// get user by son id
app.get('/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

//  ajouter un nouveau utilisateurs 
app.post('/users', async(req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
})

// modifier un utilisateurs
app.put('/users/:id', async(req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedUser);
})

// delete user 
app.delete('/users/:id', async(req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'user deleted successfully'});
})

// partie TODO

// get all todo
app.get('/todos', async(req, res) => {
    const todos = await  Todo.find({});
    res.json(todos);
})

// get todo by id
app.get('/todos/:idTodo', async(req, res) => {
    const todo = await Todo.findById(req.params.idTodo);
    res.json(todo);
})

// add todo
app.post('/todos', async(req, res) => {
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
})

// modify todo by id
app.put('/todos/:idTodo', async(req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.idTodo, req.body, {new: true});
    res.json(updatedTodo);
})

// delete todo
app.delete('/todos/:idTodo', async(req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.idTodo);
    res.json({message: 'todo deleted sucessfully'});
})

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})