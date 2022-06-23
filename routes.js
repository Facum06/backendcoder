const express = require('express');
const {Router} = express;
const Contenedor = require('./contenedor.js');
const contenedor = new Contenedor();

const router = Router();

router.get('/productos', async (req, res) => {     
    let todos = await contenedor.getAll();     
    res.render('productos', todos);    
});

router.get('/productosEjs', async (req, res) => {     
    let todos = await contenedor.getAll();    
    res.render('ejs/productosEjs', {productos : todos, mensaje: "Productos"});    
});

router.get('/productosPug', async (req, res) => {     
    let todos = await contenedor.getAll();    
    res.render('productosPug', {
        productos : todos,
        "mensaje": "Productos"
      });    
});

router.post('/productos', async (req, res) => {         
    const nuevoProducto = req.body;
    let result = await contenedor.save(nuevoProducto);
    //res.json({id: result});
    return res.redirect("/");
});

router.get('/productos/:id', async (req, res) => {    
    let id = req.params.id;
    let result = await contenedor.getById(id);       
    res.json(result);
});

router.delete('/productos/:id', async (req, res) => {    
    let id = req.params.id;
    let result = await contenedor.deleteById(id);       
    res.json({result:result});
});

router.put('/productos/:id', async (req, res) => {    
    let id = req.params.id;
    let produ = await contenedor.getById(id);
    let nuevoProducto = [];
    if (produ.id != ''){        
        nuevoProducto.push({
            title: "actualizado",
            thumbail: produ.thumbail,
            price: produ.price,
            id: produ.id
        });
        res.json(nuevoProducto);
    }
});

module.exports = router;