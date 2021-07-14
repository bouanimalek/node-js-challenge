const express = require('express');
const bodyParser = require('body-parser')
// connect to database 
const connect  = require('./database/connect'); 
// require Models
const User = require('./models/userSchema');
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

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})