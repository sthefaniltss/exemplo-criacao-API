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

app.listen(4000, () => console.log('API iniciada'));