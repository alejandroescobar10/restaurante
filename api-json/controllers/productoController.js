const fs = require('fs/promises');
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
    const pedidos = await fs.readFile(path.join(__dirname,'../db/pedidos.json'));
    const signosJson = JSON.parse(pedidos)
    res.json(signosJson);
}


module.exports = {
    producto,
    listarProductos
}