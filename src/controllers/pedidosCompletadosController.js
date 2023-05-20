const nodemailer = require('nodemailer');
const sequelize = require('../db/config');

function listarPedidos() {
    return sequelize.query(`
    SELECT pedidos.*, users.name, users.email, detalles.*, 
    GROUP_CONCAT(productos.nombre ORDER BY detalle_carritos.id_detalle_carrito SEPARATOR ', ') as productos_nombres, 
    GROUP_CONCAT(productos.precio ORDER BY detalle_carritos.id_detalle_carrito SEPARATOR ', ') as productos_precios 
    FROM pedidos 
    JOIN users ON pedidos.id_user = users.id_user 
    JOIN (SELECT id_carrito, GROUP_CONCAT(id_producto ORDER BY id_detalle_carrito SEPARATOR ', ') as productos, 
    GROUP_CONCAT(cantidad ORDER BY id_detalle_carrito SEPARATOR ', ') as cantidad, 
    GROUP_CONCAT(total ORDER BY id_detalle_carrito SEPARATOR ', ') as subtotal 
    FROM detalle_carritos GROUP BY id_carrito) detalles 
    ON pedidos.id_carrito = detalles.id_carrito 
    JOIN detalle_carritos ON detalles.id_carrito = detalle_carritos.id_carrito 
    JOIN productos ON productos.id = detalle_carritos.id_producto 
    WHERE pedidos.estado = 'completado' -- Agregar esta condición para filtrar por pedidos completados
    GROUP BY pedidos.id_pedido;
    `);

    
  }

module.exports = {
    listarPedidos,
};

  