const Sequelize = require('sequelize');

const database = process.env.DB_NAME || 'btxm9giqegwdd5wvvzl0';
const username = process.env.DB_USERNAME || 'uuurudfek1ox6nwf';
const password = process.env.DB_PASSWORD || '0Ave8VTpQu2AgX01tgYB';
const host = process.env.DB_HOST || 'btxm9giqegwdd5wvvzl0-mysql.services.clever-cloud.com';
const dialect = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  dialectOptions: {
    ssl: {
      require: true, // Require SSL/TLS
      rejectUnauthorized: false // Accept self-signed certificates
    }
  }
});

sequelize
  .authenticate()
  .then(() => console.log('Conectado a la base de datos con éxito.'))
  .catch(err => console.log('No se ha podido conectar: ', err));

module.exports = sequelize;
