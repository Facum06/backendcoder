const mysql = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce',
      port: 3307
    },
    pool: { min: 0, max: 7 }
  }

const sqlite = {
    client: "sqlite3",
    connection: {
      filename: "./db/ecommerce.db3",
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 }
  }

module.exports = { mysql, sqlite };