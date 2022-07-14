const { mysql, sqlite } = require('./dbConnect.js');
const knexMysql = require('knex')(mysql);
const knexSqlite = require('knex')(sqlite);

knexMysql.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbail')
})
.then(() => console.log("Ok"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knexMysql.destroy();
});

knexSqlite.schema.createTable('mensajes', table => {
        table.increments('id')
        table.string('email')
        table.string('mensaje')
    })
.then(() => console.log("Ok"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knexSqlite.destroy();
});