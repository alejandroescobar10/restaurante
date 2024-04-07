const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router
//listar
.get('/listarProductos', productoController.listarProductos)
//devolver producto especifico
.get('/:id', productoController.producto)
//actualizar
.patch('/updateProducto', productoController.updateProducto)
.post('/agregarProducto', productoController.agregarProducto)
module.exports = router;