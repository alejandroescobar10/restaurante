const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router
    .post('/login', userController.login)
    .get('/getAllUsuarios', userController.getAllUsuarios)
    .get('/getOneUser', userController.getOneUser)
    .patch('/updateUser', userController.updateUser)
    //guardar pedidos
    //.post('/pedido/:id', pedidoController.pedido)
    //.get('/listarPedido', pedidoController.listarPedido)


module.exports = router;