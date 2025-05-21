import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    async function validarFormulario(event) {
        event.preventDefault(); 
        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;

        let response, data;
        try {
            response = await fetch('http://localhost:5000/api/validar?usuario=' + encodeURIComponent(usuario) + '&clave=' + encodeURIComponent(clave))
;
            data = await response.json();
        } catch (e) {
            alert('Error de conexión o respuesta inválida del servidor.');
            return;  
        }

        if (response.status === 400) {
            alert(`Errores: ${data.errores ? data.errores.join(', ') : 'Error desconocido'}`);
        } else if (response.ok) {
    alert(data.mensaje);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('clave', clave); 
    navigate('/home');
    
    } else {
            alert('Error inesperado. Intente nuevamente.');
        }
    }

    return (
        <>
            <div className="contenedor-login">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={validarFormulario} className="formulario-login">
                    <div className="campo">
                        <label htmlFor="usuario">Usuario:</label>
                        <input type="text" id="usuario" name="usuario" required />
                    </div>
                    <div className="campo">
                        <label htmlFor="clave">Contraseña:</label>
                        <input type="password" id="clave" name="clave" required />
                    </div>
                    <button type="submit" className="boton">Entrar</button>
                </form>
                <p className="link">
                    ¿No tenés cuenta? <Link to="/Registro">Registrate</Link>
                </p>
            </div>
        </>
    )
}

export default Login