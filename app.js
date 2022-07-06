const express = require('express');
const { Socket } = require('engine.io');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const router = require("./routes.js");
const exphbs = require('express-handlebars');

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const mensajes = []
const PORT = process.env.PORT || 8080;

//app.set('view engine', 'pug');
app.set('view engine', 'handlebars');
//app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));
app.get("/", (req, res) =>{
    res.sendFile('index.html', {root: __dirname});
});

app.engine('handlebars', exphbs.engine());
app.set('productos', 'views');
app.set('productosPug', 'views');
app.set('productosEjs', 'views');

let productos = [];

io.on('connection', (socket) => {
    //Obtiene los mensajes
    socket.emit('mensajes', mensajes);
    //Entrega los mensajes
    socket.on('mensaje', data => {
        mensajes.push({ socketid : socket.id, mensaje: data })
        io.sockets.emit('mensajes', mensajes);        
    })

    socket.emit('productos', productos);
    socket.on('producto', data => {       
        io.sockets.emit('productos', data);        
    })
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});

module.exports = app;