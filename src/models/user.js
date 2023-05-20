const Sequelize = require('sequelize');
const sequelize=require('../db/config');

const User = sequelize.define("usuarios", {
    nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contrasena: {
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

User.sync()
.then(() => console.log("Sequelize models initialized"))
.catch(err => console.error("Error while initializing models: ", err));



module.exports = {
    User
};