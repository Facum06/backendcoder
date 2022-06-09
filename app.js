const express = require('express');
const Contenedor = require('./contenedor.js');
const app = express();
const contenedor = new Contenedor();

const PORT = process.env.PORT || 8080;

app.get('/productos', async (req, res) => {     
    let todos = await contenedor.getAll();       
    res.json(todos);
});

app.get('/productoRandom/:id', async (req, res) => {    
    let id = req.params.id;
    let random = await contenedor.getById(id);       
    res.json(random);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});

module.exports = app;