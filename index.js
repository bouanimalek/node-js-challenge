const express = require('express');
const bodyParser = require('body-parser')
// connect to database 
const connect  = require('./database/connect'); 
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => {
  res.json({message : 'Welcome back!'})
})

const userApi = require('./routes/userApi');
const todoApi = require('./routes/todoApi');

const customerApi = require('./routes/customerApi');
const identifierApi = require('./routes/identifierApi');

app.use('', userApi);
app.use('', todoApi);

app.use('', customerApi);
app.use('', identifierApi);

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})