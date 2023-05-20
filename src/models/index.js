
const { DetalleCarrito } = require('../models/detalle_carrito');
const { Productos } = require('../models/productos');
const { Categorias } = require('../models/categorias');
const { Pedido } = require('../models/pedidos');
const { PedidoEnProceso } = require('../models/pedidoEnProceso');

// Realizar las relaciones entre los modelos
Categorias.hasMany(Productos, { foreignKey: 'categoria_id' });
Productos.belongsTo(Categorias, { foreignKey: 'categoria_id' });
User.hasOne(Carrito, { foreignKey: 'id_user' });
Carrito.belongsTo(User, { foreignKey: 'id_user' });
Carrito.hasMany(DetalleCarrito, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(Productos, { foreignKey: 'id_producto' });
Pedido.belongsTo(User, { foreignKey: 'id_user' });
Pedido.belongsTo(Carrito, { foreignKey: 'id_carrito' });
Carrito.hasMany(Pedido, { foreignKey: 'id_carrito' });
PedidoEnProceso.belongsTo(User, { foreignKey: 'id_user' });
PedidoEnProceso.hasMany(DetalleCarrito, { foreignKey: 'id_carrito' });
PedidoEnProceso.belongsTo(Pedido, { foreignKey: 'id_pedido' });

module.exports = {
  Carrito,
  DetalleCarrito,
  Productos,
  Categorias,
  User,
  Pedido,
  PedidoEnProceso,
};
