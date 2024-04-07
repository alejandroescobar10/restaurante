const fs = require('fs/promises');
const path = require('path');


const updatePedido = async (req, res) => {
    const idPedido = req.params.id;
    const { estado } = req.body;
    const allPedidos = await fs.readFile(path.join(__dirname, '../db/pedido.json'));
    const objPedido = JSON.parse(allPedidos);

    const indice = objPedido.findIndex(pedido => pedido.id == idPedido);

    if (indice != -1) {
        objPedido[indice] = {
            ...objPedido[indice], //obtengo el indice del pedido
            [estado]: estado,

        }
    } else {
        console.log('El ID no fue encontrado en la base de datos.');
    }

    //console.log(objPedido);
    await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(objPedido[indice], null, 2), { encoding: 'utf-8' })

    res.json({
        message: "Updated"
    })
}
const guardarPedido = async (req, res) => {
    try {
        // Obtén los datos del pedido del cuerpo de la solicitud
        const { body } = req;
        console.log({ body })
        const { mesa, pedido, mesero } = body;


        // Lee el contenido del archivo de pedidos (si existe)
        let guardarJson = [];
        try {
            const guardar = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
            guardarJson = JSON.parse(guardar);
        } catch (error) {
            // Si hay un error al leer el archivo, probablemente sea porque aún no existe, en ese caso, no hay nada que leer
            console.error('Error al leer el archivo de pedidos:', error);
        }

        // Generar un ID único para el pedido
        const id = (guardarJson.length + 1).toString();

        // Agrega el nuevo pedido al arreglo de pedidos
        guardarJson.push({ id, estado: "proceso", mesa, mesero, pedido });


        // Escribe el nuevo arreglo de pedidos en el archivo
        await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(guardarJson, null, 2));

        // Responde con un mensaje de éxito y el pedido guardado
        res.status(201).json({ mensaje: 'Pedido guardado exitosamente' });
    } catch (error) {
        // Si ocurre algún error, responde con un código de estado 500 y un mensaje de error
        console.error('Error al guardar el pedido:', error);
        res.status(500).json({ mensaje: 'Error al guardar el pedido' });
    }
}
const listarPedidos = async (req, res) => {
    try {
        // Lee el contenido del archivo de pedidos
        const pedidosJson = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
        const pedidos = JSON.parse(pedidosJson);

        // Responde con la lista de pedidos
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al listar los pedidos:', error);
        res.status(500).json({ mensaje: 'Error al listar los pedidos' });
    }
};
const cambiarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del pedido de los parámetros de la URL
        const { estado } = req.body; // Obtener el nuevo estado del cuerpo de la solicitud

        // Leer el contenido del archivo JSON de pedidos
        const pedidosJson = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
        const pedidos = JSON.parse(pedidosJson);

        // Buscar el pedido por su ID en la lista de pedidos
        const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);

        if (pedidoIndex === -1) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        // Actualizar el estado del pedido
        pedidos[pedidoIndex].estado = estado;

        // Escribir los cambios de vuelta al archivo JSON
        await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(pedidos, null, 2));

        // Responder con la lista actualizada de pedidos
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al cambiar el estado del pedido:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
module.exports = {
    updatePedido,
    guardarPedido,
    listarPedidos,
    cambiarEstadoPedido
}
//listar pedidos
//actualizar pedido