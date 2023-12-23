const Sequelize = require('sequelize');
const sequelize = require('../db/config');


const Productos = sequelize.define("productos", {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  unidadMedida: {
    type: Sequelize.STRING,
    allowNull: false
  },

  // img_url: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
});



Productos.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  Productos
};

