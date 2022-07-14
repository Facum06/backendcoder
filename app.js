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

const { mysql, sqlite } = require('./dbConnect.js');
const knexMysql = require('knex')(mysql);
const knexSqlite = require('knex')(sqlite);

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
        function listMsg(){
            knexSqlite
                .from("mensajes")
                .select("*")
                .then((rows) => {
                    io.sockets.emit('mensajes', mensajes);   
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).end()
                }
            )
        }
        knexSqlite("mensajes")
            .insert(data)
            .then(() => {
                console.log("Ok");
                listMsg();
            })
            .catch((err) => {
                console.log(err);
            }
        )    
    })
    socket.emit('productos', productos);
    socket.on('producto', data => {   
        knexMysql
            .from("productos")
            .select("*")
            .then((rows) => {
                io.sockets.emit('productos', rows);                            
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end()
            }
        )
    })
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});

module.exports = app;