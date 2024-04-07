//const fs = require('fs/promises');
const fs = require('fs')
const path = require('path');

const producto= async (req, res)=>{
    
    const { id } = req.params;
    let productos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    let productosJson = JSON.parse(productos)
    const producto = productosJson.find(product => product.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
}

const listarProductos = async (req,res) =>{
    const producto = await fs.promises.readFile(path.join(__dirname,'../db/productos.json'));
    const listarJson = JSON.parse(producto)
    res.json(listarJson);
}

const updateProducto = async (req, res)=>{
    const idProducto = req.params.id;
    const {nombre, precio} = req.body;
    const allProductos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    const objProducto = JSON.parse(allProductos);
   
    const indice = objProducto.findIndex(producto => producto.id == idProducto);

    if (indice !=-1) {
        objProducto[indice] = {
            ...objProducto[indice],
            [nombre] : nombre,
            [precio] : precio
        }
    } else {
        console.log('El ID no fue encontrado en la base de datos.');
    }   
    
    //console.log(objUsers);
    await fs.writeFile(path.join(__dirname,'../db/user.json'), JSON.stringify(objProducto[indice], null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}
const agregarProducto = async (req, res) => {
    try {
        // Obtener los datos del nuevo producto del cuerpo de la solicitud
        const { nombre, precio } = req.body;
        console.log('Datos del nuevo producto:', { nombre, precio });
        
        // Leer el archivo de productos (si existe)
        let productos = [];
        try {
            const data = await fs.promises.readFile(path.join(__dirname, '../db/productos.json'));
            productos = JSON.parse(data);
            console.log('Productos actuales:', productos);
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            throw error; // Relanza el error para que sea capturado por el bloque catch externo
        }
        
        // Generar un ID único para el producto
        const id = (productos.length + 1).toString();
        
        // Agregar el nuevo producto al arreglo de productos
        productos.push({ id, nombre, precio });
        console.log('Nuevo arreglo de productos:', productos);

        // Escribir el nuevo arreglo de productos en el archivo
        await fs.promises.writeFile(path.join(__dirname, '../db/productos.json'), JSON.stringify(productos, null, 2), 'utf8');
        console.log('Producto agregado exitosamente');

        // Responder con un mensaje de éxito
        res.status(201).json({ mensaje: 'Producto agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        // Responder con un mensaje de error
        res.status(500).json({ mensaje: 'Error al agregar producto', error: error.message });
    }
}




module.exports = {
    producto,
    listarProductos,
    updateProducto,
    agregarProducto
}