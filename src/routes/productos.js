const express  = require("express");
const router=express.Router();

const productosController=require('../controllers/productosController');
const categoriasController=require('../controllers/categoriasController');

const midellwareImg= require('../middleware/productos');


router.get('/productos', async function(req, res) {
    try {
      const productos =await productosController.list();
      const categorias = await categoriasController.list();
      res.render('productos',{
        productos: productos,
        categorias: categorias
    });
    } catch (err) {
      res.status(500).send(err);
    }
  });


  router.post('/productos/add', midellwareImg, async function(req, res) {
    try {
      const hostname = req.hostname; // Obtener el nombre del host actual
      const protocol = req.protocol; // Obtener el protocolo utilizado (http o https)
      const port = req.app.get('port'); // Obtener el puerto configurado en la aplicación (en este caso, 3000)
      const Image = `${protocol}://${hostname}/uploads/productos/${req.file.originalname}`;
      const data = req.body;
      const color = req.body.color[0]; // obtener el primer elemento del arreglo
      data.color = color;
      await productosController.save(data, Image);
      res.redirect('/productos');
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  


router.get('/productos/delete/:id', async function(req, res) {
  try {
    const id = req.params.id;
    await productosController.eliminar(id);
    res.redirect('/productos');
    
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/productos/update/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const productos=await productosController.edit(id);
    const categorias = await categoriasController.list();
    res.render('productos_edit',{
      data: productos[0],
      categorias: categorias
  });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/productos/update/:id',midellwareImg, async function(req, res) {
  try {
    const {id} = req.params;
    const hostname = req.hostname; // Obtener el nombre del host actual
    const protocol = req.protocol; // Obtener el protocolo utilizado (http o https)
    const port = req.app.get('port'); // Obtener el puerto configurado en la aplicación (en este caso, 3000)
    const newImagen = `${protocol}://${hostname}:${port}/uploads/productos/${req.file.originalname}`;
    const newproductos  = req.body;
    const color = req.body.color[0]; // obtener el primer elemento del arreglo
    newproductos.color = color;
    await productosController.updatee(id, newproductos, newImagen);
    res.redirect('/productos');
  } catch (err) {
    res.status(500).send(err);
  }
});





module.exports=router;
