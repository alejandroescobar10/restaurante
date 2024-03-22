const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router
.get('/:id', productoController.producto)
//listar
.get('/listarProductos', productoController.listarProductos)
//actualizar

module.exports = router;