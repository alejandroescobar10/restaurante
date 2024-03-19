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
            <h2>Cocina</h2>
            <ul>
                <ol>#mesa</ol>
                <ol>producto</ol>
                <ol>estado</ol>
            </ul>





        </div>
    )
}    