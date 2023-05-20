const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Pedido = sequelize.define("pedidos", {
  id_pedido: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  id_carrito: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

// Establecer relación




Pedido.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  Pedido
};

