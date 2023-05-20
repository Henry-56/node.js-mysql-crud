const nodemailer = require('nodemailer');
const sequelize = require('../db/config');
const { Pedido } = require('../models/pedidos');


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
GROUP BY pedidos.id_pedido;
  


`);
}


async function updatee(id, estado) {
  await Pedido.update(
    { estado: estado }, // Objeto con los nuevos valores a actualizar
    { 
      where: { id_pedido: id },
      fields: ['estado'] // Columnas que se deben actualizar
    } 
  );

  return Pedido.findByPk(id);
}


function sendEmail(data) {
  console.log(data)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'empresaryh8@gmail.com',
      pass: 'uezz gudt bmal ibjg'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const nombresProductos = data.productos_nombres.split(', ');
  const cantidadesProductos = data.cantidad.split(', ');
  const preciosProductos = data.productos_precios.split(', ');

  let productosDetalle = '';

  for (let i = 0; i < nombresProductos.length; i++) {
    const productoDetalle = `- ${nombresProductos[i]}: Cantidad: ${cantidadesProductos[i]}, Precio: S/${preciosProductos[i]}\n`;
    productosDetalle += productoDetalle;
  }

  const mailOptions = {
    from: 'empresaryh8@gmail.com',
    to: `${data.email}`,
    subject: 'Se está procesando tu pedido',
    text: `Estimado cliente,

Gracias por tu interés en nuestros productos. Nos complace informarte que estamos procesando tu pedido. A continuación, encontrarás los detalles de los productos solicitados:

${productosDetalle}
Total: S/${data.total}

Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.

Atentamente,
Tu empresa
`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}



function sendEmailComplt(data) {
  //console.log(data);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'empresaryh8@gmail.com',
      pass: 'uezz gudt bmal ibjg'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const nombresProductos = data.productos_nombres.split(', ');
  const cantidadesProductos = data.cantidad.split(', ');
  const preciosProductos = data.productos_precios.split(', ');

  let productosDetalle = '';
  let subtotal = 0;

  for (let i = 0; i < nombresProductos.length; i++) {
    const productoDetalle = `${cantidadesProductos[i]} x ${nombresProductos[i]} - S/${preciosProductos[i]}\n`;
    subtotal += cantidadesProductos[i] * preciosProductos[i];
    productosDetalle += productoDetalle;
  }

  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const mailOptions = {
    from: 'empresaryh8@gmail.com',
    to: `${data.email}`,
    subject: 'Boleta de Venta',
    text: `Estimado cliente,

Gracias por su compra. A continuación encontrará los detalles de su pedido:

${productosDetalle}
Subtotal: S/${subtotal.toFixed(2)}
IGV (18%): S/${igv.toFixed(2)}
Total: S/${total.toFixed(2)}

Si tiene alguna pregunta o necesita más información, no dude en contactarnos.

Atentamente,
Tu empresa
`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}




module.exports = {
  listarPedidos,
  updatee,
  sendEmail,
  sendEmailComplt
};
