const express  = require("express");

const router=express.Router();

const categoriasController=require('../api/customerApiController');

router.get('/categorias-json', async function(req, res) {
    try {
        const categorias=await categoriasController.listJSONC();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/productos-json', async function(req, res) {
    try {
        const productos=await categoriasController.listJSONP();
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).send(err);
    }
});

  
  
  
  

module.exports=router;
