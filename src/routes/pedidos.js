const express  = require("express");
const router=express.Router();

const pedidosController=require('../controllers/pedidosController');



//TOKEN

//ADIMIN

//USUIARIOS FINALES




router.get('/pedidos', async function(req, res) {
  try {
    const pedidos = await pedidosController.listarPedidos();
    const pedidosObj = {};
    pedidos[0].forEach((row) => {
      pedidosObj[row.id_pedido] = row;
    });
    res.render('pedidos',{
      data: pedidosObj
  });
  //console.log(pedidosObj)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pedidos/delete/:id', async function(req, res) {
  try {
    const id = req.params.id;
    await pedidosController.eliminar(id);
    res.redirect('/categorias');
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/pedidos/update/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    
    console.log(id);
    console.log(estado);
    
    //await pedidosController.sendEmail(id, estado);
    // Resto de la lógica para actualizar el pedido con el ID y el estado
    await pedidosController.updatee(id, estado);
    res.redirect("/pedidos");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/enviar-correo', async function(req, res) {
  try {
    const data = req.body;
    console.log("aaaa");
    console.log(req.body);

    
    if (data.estado === 'proceso') {
      // Resto de la lógica para actualizar el pedido con el ID y el estado
      await pedidosController.sendEmail(data);
      res.redirect("/pedidos");
    } else if (data.estado === 'completado') {
      console.log("estamos en completado")
      // Esperar a que se ejecute otra función
      // Aquí puedes llamar a la función que deseas ejecutar cuando el estado es 'completado'
      await pedidosController.sendEmailComplt(data);
      res.redirect("/pedidos");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});










module.exports=router;