const express  = require("express");
const router=express.Router();

const productosController=require('../controllers/productosController');


const midellwareImg= require('../middleware/productos');


router.get('/productoss', async function(req, res) {
    try {
      const productos =await productosController.list();
      console.log(productos);
      res.render('productos',{
        productos: productos,
    });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/productos', async function(req, res) {
    try {
      const productos =await productosController.list();
      console.log(productos);
      res.status(200).json({
        productos: productos
    });
    } catch (err) {
      res.status(500).send(err);
    }
  });



  router.post('/productos/add', midellwareImg, async function(req, res) {
    try {
      // const hostname = req.hostname; // Obtener el nombre del host actual
      // const protocol = req.protocol; // Obtener el protocolo utilizado (http o https)
      // const port = req.app.get('port'); // Obtener el puerto configurado en la aplicación (en este caso, 3000)
      // const Image = `${protocol}://${hostname}/uploads/productos/${req.file.originalname}`;
      const data = req.body;
      console.log(data);
      await productosController.save(data);
      res.redirect('/productos');
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  


router.get('/productoss/delete/:id', async function(req, res) {
  try {
    const id = req.params.id;
    await productosController.eliminar(id);
    res.redirect('/productos');
    
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/productos/delete/:id', async function(req, res) {
  try {
    const id = req.params.id;
    await productosController.eliminar(id);
    res.send('Eliminación satisfactoria');
  } catch (err) {
    res.status(500).send(err);
  }
});



router.get('/productos/update/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const productos=await productosController.edit(id);
    res.status(200).json({
      productos: productos
  });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/productos/update/:id',midellwareImg, async function(req, res) {
  try {
    const {id} = req.params;
    // const hostname = req.hostname; // Obtener el nombre del host actual
    // const protocol = req.protocol; // Obtener el protocolo utilizado (http o https)
    // const port = req.app.get('port'); // Obtener el puerto configurado en la aplicación (en este caso, 3000)
    // const newImagen = `${protocol}://${hostname}/uploads/productos/${req.file.originalname}`;
    const newproductos  = req.body;
    const producto=await productosController.updatee(id, newproductos, );
    console.log(producto);
    res.status(200).json({
      productos: producto
  });
  } catch (err) {
    res.status(500).send(err);
  }
});





module.exports=router;
