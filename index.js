const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome back!')
})


// get all users
app.get('/users', async(req, res) => {
    res.send('Welcome again!')
})

// get user by son id
app.get('/users/:id', async(req, res) => {
    res.send('Welcome back!')
})

//  ajouter un nouveau utilisateurs 
app.post('/users', async(req, res) => {
    res.send('Welcome back!')
})

// modifier un utilisateurs
app.put('/users/:id', async(req, res) => {
    res.send('Welcome back!')
})

// delete user 
app.delete('/users/:id', async(req, res) => {
    res.send('Welcome back!')
})

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})