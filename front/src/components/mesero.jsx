import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function UserHome({user}){
    if(user!=="mesero" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }
    return(
        <div class="contenedor">
            <h2>Menu</h2>
            <select id="editMesa" onClick={handleSelect}>
                <option value="0">Selecciona mesa</option>
                <option value="mesa1">mesa 1</option>
                <option value="mesa2">mesa 2</option>
                <option value="mesa3">mesa 3</option>
            </select>
            <select id="editMenu" onClick={handleSelect}>
                <option value="0">Selecciona un plato del menu</option>
                <option value="pollo">pollo</option>
                <option value="carne">carne</option>
                <option value="pescado">pescado</option>
            </select>
            <p>Selecciona cantidad</p>
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h3>Pedido:</h3>
            <ul id="listaPedido"></ul>
            <button type="submit">Enviar Pedido</button>
        </div>
    )
}    