import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cocina() {
    const [pedidos, setPedidos] = useState([]);
    
    const goTO = useNavigate(); // Usar useNavigate para obtener la función de navegación

    const handleVolver = () => {
        goTO('/Form.jsx'); // Utilizar la función navigate para redirigir a la página de login
    };
    const estado = () => {
        fetch('http//localhost:4000')
    }

    useEffect(() => {
        // Aquí realizarías la solicitud al servidor para obtener los pedidos
        fetch('http://localhost:4000/v1/pedido/listarPedidos')
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Error al obtener los pedidos:', error));
    }, []);
    // Función para cambiar el estado del pedido
    const handleCambiarEstado = (pedidoId) => {
        console.log("ID del pedido:", pedidoId); // Agregamos el console.log para verificar el valor de pedidoId
        fetch(`http://localhost:4000/v1/pedido/cambiarEstadoPedido/${pedidoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: 'listo' }) // Cambia el estado a "listo"
        })
        .then(response => {
            console.log("Respuesta del servidor:", response); // Agregamos este console.log para verificar la respuesta del servidor
            return response.json();
        })
        .then(data => {
            // Actualiza el estado local de los pedidos después de cambiar el estado en el servidor
            const updatedPedidos = pedidos.map(pedido => {
                if (pedido.id === pedidoId) {
                    return { ...pedido, estado: 'listo' };
                }
                return pedido;
            });
            setPedidos(updatedPedidos);
        })
        .catch(error => console.error('Error al cambiar el estado del pedido:', error));
    };

    return (
        <div className="bg-dark text-white p-3 mb-3">
            <h2>Lista de Pedidos en Cocina</h2>
            <ul className="list-group">
                {pedidos.map(pedido => (
                    <li key={pedido.id} className="list-group-item">
                        <h4>Pedido {pedido.id}</h4>
                        <p><strong>Mesa:</strong> {pedido.mesa}</p>
                        <p><strong>Mesero:</strong> {pedido.mesero}</p>
                        <p><strong>Estado:</strong> {pedido.estado}</p>
                        <h5>Productos:</h5>
                        <ul>
                            {pedido.pedido.map((producto, index) => (
                                <li key={index}>
                                    {producto.cantidad}x {producto.producto} - Precio: ${producto.precio}
                                </li>
                            ))}
                             
                            <button className="btn btn-success" onClick={() => handleCambiarEstado(pedido.id)}>Listo</button>
                        </ul>
                    </li>
                    
                    
                ))}
            </ul>
            <div className="mt-4">
                <button className="btn btn-danger" onClick={handleVolver}>Ir a Login</button>
            </div>
        </div>
    );
}

export default Cocina;