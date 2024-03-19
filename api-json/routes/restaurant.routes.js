const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router
    .post('/login', userController.login)
    .get('/getAllUsuarios', userController.getAllUsuarios)
    .get('/getOneUser', userController.getOneUser)
    .patch('/updateUser', userController.updateUser)
    //guardar pedidos
    .post('/pedido', meseroController.pedido)


module.exports = router;