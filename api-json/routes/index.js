const productosRouter = require('./producto.routes');
const userRouter = require('./user.routes');

function routerApi(app){
    app.use('/productos', productosRouter);
    app.use('/user', userRouter);
}
module.exports = routerApi;