const { Productos } = require('../models/productos');
    
function list() {
   return Productos.findAll();
};



function save(data, Image) {

    return Productos.create({ 
      nombre: data.nombre,
      categoria: data.categoria,
      precio: data.precio,
      talla: data.talla,
      unidadMedida: data.unidadMedida,
    });

};


function eliminar(id) {
  return Productos.destroy({
    where: {
      id: id
    },
  });
};


function edit(id) {
  return Productos.findAll({
    where: {
      id: id
    },
  });
};



function updatee(id, newproductos) {
  return Productos.update(
    { 
      nombre: newproductos.nombre,
      categoria: newproductos.categoria,
      precio: newproductos.precio,
      unidadMedida: newproductos.unidadMedida,
    },
    { 
      where: { id }
    }
  ).then(() => {
    return Productos.findByPk(id);
  });
}





module.exports={
    list,
    save,
    eliminar,
    edit,
    updatee
    
}