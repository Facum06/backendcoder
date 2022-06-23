const express = require('express');

const app = express();
const router = require("./routes.js");
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

//app.set('view engine', 'pug');
//app.set('view engine', 'handlebars');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));

app.engine('handlebars', exphbs.engine());
app.set('productos', 'views');
app.set('productosPug', 'views');
app.set('productosEjs', 'views');

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});

module.exports = app;