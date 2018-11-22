const express = require('express');
const Joi = require('joi');
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
    const id = Math.max(...users.map(user => user.id)) + 1;
    const newUser = {
        id,
        name: req.body.name,
        email: req.body.email
    };
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required()
    }
    const validation = Joi.validate(req.body, schema);
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message);
    } 
    users.push(newUser);
    res.send(newUser);
})

app.put('/api/users/:id', (req, res) => {
    const updateUser = users.find(user => user.id === parseInt(req.params.id));
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required()
    }
    const validation = Joi.validate(req.body, schema);
    if(!updateUser) {
        return res.status(404).send('Não encontramos esse usuário :(');
    }
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message);
    } 
    updateUser.name = req.body.name;
    updateUser.email = req.body.email;
    
    res.send(updateUser);
    
})

app.delete('/api/users/:id', (req, res) => {
    const deleteUser = users.find(user => user.id === parseInt(req.params.id));
    const index = users.indexOf(deleteUser);
    if(index > -1){
        users.splice(index, 1);
        res.send(deleteUser);
    }
    
})
app.listen(4000, () => console.log('API iniciada'));