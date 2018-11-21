const express = require('express');
const users = require('./users.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send("Bem vindo à minha API"));
app.get('/api/users', (req, res) => res.send(users));
app.get('/api/users/:id', (req, res) =>{
    const getUser = users.find(user => user.id === parseInt(req.params.id));
    if(!getUser) {
        return res.status(404).send('Não encontramos esse usuário :(');
    }
    res.send(getUser);
})
app.post('/api/users', (req, res) =>{
    const newUser = {
        id: users.length+1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.send(newUser);
})

app.put('/api/users/:id', (req, res) => {
    const updateUser = users.find(user => user.id === parseInt(req.params.id));
    if(!updateUser) {
        return res.status(404).send('Não encontramos esse usuário :(');
    }
    if(!req.body.name || !req.body.email){
        return res.status(400).send('É necessário incluir nome e email!');
    } 
    updateUser.name = req.body.name
    updateUser.email = req.body.email
    
    res.send(updateUser);
    res.send('Alteração feita com sucesso');

})

app.listen(4000, () => console.log('API iniciada'));