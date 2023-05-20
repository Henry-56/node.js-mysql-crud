const express  = require("express");
const router=express.Router();

const pedidosCompletadosController=require('../controllers/pedidosCompletadosController');



//TOKEN

//ADIMIN

//USUIARIOS FINALES




router.get('/pedidos/completados', async function(req, res) {
  try {
    const pedidos = await pedidosCompletadosController.listarPedidos();
    const pedidosObj = {};
    pedidos[0].forEach((row) => {
      pedidosObj[row.id_pedido] = row;
    });
    res.render('pedidosCompletados',{
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












module.exports=router;