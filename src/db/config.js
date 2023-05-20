const Sequelize = require('sequelize');

const database = process.env.DB_NAME || 'riohuay';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || 'localhost';
const dialect = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect
});

sequelize
  .authenticate()
  .then(() => console.log('Conectado a la base de datos con éxito.'))
  .catch(err => console.log('No se ha podido conectar: ', err));

module.exports = sequelize;
