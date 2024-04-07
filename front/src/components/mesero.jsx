import { Navigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';




function Mesero({ user }) {
    const [productos, setProductos] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidad, setCantidad] = useState("");
    const ruta = 'http://localhost:4000/v1/';
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [meseroSeleccionado, setMeseroSeleccionado] = useState('');

    if (user !== "mesero" || !user) {
        return <Navigate to="/" />
    }
    // Cargar los productos cuando el componente se monte


    const handleSelectMesa = event => {
        setMesaSeleccionada(event.target.value);
    };

    const listarProductos = async () => {
        fetch(`${ruta}productos/listarProductos`)
            .then(data => data.json())
            .then(response => {
                setProductos(response)
            })

    }
    const seleccionarProducto = (event) => {
        const idProducto = event.target.value;
        const productoSeleccionado = productos.find(producto => producto.id == idProducto);
        const productoConDetalles = {
            ...productoSeleccionado,
            cantidad: cantidad, // Agrega la cantidad seleccionada al objeto del producto
            mesa: mesaSeleccionada, // Agrega la mesa seleccionada al objeto del producto
            mesero: meseroSeleccionado // Agrega el mesero seleccionado al objeto del producto
        };
        setProductosSeleccionados([...productosSeleccionados, productoConDetalles]);
    };
    
    const cargarProductos =async(arregloProducto)=>{
        setProductosSeleccionados(arregloProducto)
    }
    const goTo = useNavigate();
    
    const enviarPedido = () => {
        if (productosSeleccionados.length === 0 || !mesaSeleccionada) {
            alert("Por favor selecciona productos y mesa antes de enviar el pedido.");
            return;
        }

        // Preparar los datos del pedido
        const datosPedido = {
            mesa: mesaSeleccionada,
            mesero : meseroSeleccionado,
            pedido: productosSeleccionados.map(producto => ({
                producto: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad
                
                
            }))
        };

        // Enviar la solicitud POST al servidor
        fetch(`${ruta}/pedido/guardarPedido`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosPedido)
        })
        .then(response => {
            if (response.ok) {
                alert("Pedido enviado exitosamente.");
                setProductosSeleccionados([]); // Limpiar la lista de productos seleccionados
                setMesaSeleccionada(""); // Limpiar la mesa seleccionada
            } else {
                alert("Error al enviar el pedido.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al enviar el pedido.");
        });
    }
    const actualizarCantidad = (cantidad) => {
        // Verificar si la cantidad es un número positivo
        if (cantidad >= 1) {
            setCantidad(cantidad); // Actualizar el estado de la cantidad
        } else {
            alert("La cantidad debe ser un número positivo."); // Mostrar una alerta si la cantidad es inválida
        }
    };
    useEffect(() => {
        listarProductos();
    }, [])
    return (
        <div className="bg-dark text-white p-3 mb-3">
            <h2>Menu</h2>
            <div className="container-sm" id="container">
                <select className="form-select" id="editMesa" value={mesaSeleccionada} onChange={handleSelectMesa}>
                    <option value="">Selecciona mesa</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div><br />
            <div className="container-sm" id="container">
                <select id="editMenu" onChange={seleccionarProducto} className="form-select" aria-label="Default select example" >
                    <option value="0">seleccione producto</option>
                    {
                        productos.map(producto =>
                            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                        )
                    }
                </select><br />
                <select className="form-select" id="" value={meseroSeleccionado} onChange={(e) => setMeseroSeleccionado(e.target.value)}>
                    <option value="">Selecciona mesero</option>
                    <option value="Oscar">Oscar</option>
                    <option value="David">David</option>
            </select>
            </div>
            <p>Selecciona cantidad</p>
            <input key={cantidad} type="number" className="entry"  value={cantidad}onChange={(e) =>  actualizarCantidad(parseInt(e.target.value))}min="1" required /><br></br>
            
            {/*<button type="button" onClick={agregarProducto}>Agregar al Pedido</button>*/}
            <h3>Pedido:</h3>
            
            <ul id="listaPedido" className="list-group" >
                {
                    productosSeleccionados.map((product, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{product.nombre}</strong> - producto: {product.nombre} - Cantidad: {product.cantidad} - Mesa: {product.mesa} - Precio: {product.precio} - mesero: {product.mesero}
                        </li>
                    ))}
                
            </ul>
            <br />
            <button className="btn btn-primary" type="submit" onClick={enviarPedido}>Enviar Pedido</button>
            <br />
            {/*<div className="mt-4">
                <Link onClick={handleVolver} className="btn btn-danger">Ir a Cocina</Link>
            </div>*/}
            
        </div>
        
    )
}
export default Mesero;