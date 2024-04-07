const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router
.post('/guardarPedido', pedidoController.guardarPedido)
.get('/listarPedidos', pedidoController.listarPedidos)
.put('/cambiarEstadoPedido/:id', pedidoController.cambiarEstadoPedido)
module.exports = router;