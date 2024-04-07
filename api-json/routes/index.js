const express = require('express');
const pedidoRouter = require('./pedido.routes');
const productoRouter = require('./producto.routes');
const userRouter = require('./user.routes');


function routerApi(app){
    app.use('/productos', productoRouter);
    app.use('/pedido', pedidoRouter);
    app.use('/user', userRouter);
}
module.exports = routerApi;