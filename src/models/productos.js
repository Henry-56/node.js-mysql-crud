const Sequelize = require('sequelize');
const sequelize = require('../db/config');
const {Categorias} = require('../models/categorias');

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
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  precio: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  talla: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantidad: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria_id: {  // nueva propiedad
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id'
    }
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

Productos.belongsTo(Categorias, {
   foreignKey: 'categoria_id' 
});  // establece la relación

Productos.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  Productos
};

