import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        /*if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }else if(username === 'mesero' && password ==='user2023'){
            callback("mesero");
            goTo("/mesero");
        }else if(username === 'cocina' && password === 'cocina2023'){
            callback("cocina");
            goTo("/cocina");
        }*/
        fetch(`http://localhost:4000/v1/user/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.usuario.rol == "admin") {
                    callback("admin");
                    goTo("/admin");
                } else if (responseData.usuario.rol == "mesero") {
                    callback("mesero");
                    goTo("/mesero");
                } else if (responseData.usuario.rol == "cocina") {
                    callback("cocina");
                    goTo("/cocina");
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }
    return (
        <div className="container mt-5">
            <form onSubmit={validateUser}>
                <h1 className="mb-4 text-primary">Bienvenido a nuestro restaurante</h1>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
            <div className="mt-3">
                {/* Enlace para ir a la vista de la cocina */}
                <button className="btn btn-link" onClick={() => navigate('/cocina')}>Ir a la cocina</button>
            </div>
        </div>

    )
};

export default Form;