import React from 'react'

const Login = () => {
       async function validarFormulario(event) {
            event.preventDefault(); 
            const usuario = document.getElementById('usuario').value;
            const clave = document.getElementById('clave').value;

          
            const response = await fetch(`/validar?usuario=${encodeURIComponent(usuario)}&clave=${encodeURIComponent(clave)}`);
            const data = await response.json();

            if (response.status === 400) {
             
                alert(`Errores: ${data.errores.join(', ')}`);
            } else {
               
                alert(data.mensaje);
                window.location.href = "../index.html";
            }
        }


  return (
    <>
         <div class="contenedorr-login">
        <h2>Iniciar Sesión</h2>
        <form onsubmit="validarFormulario(event)" class="formulario-login">
            <div class="campo">
                <label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" required/>
            </div>

            <div class="campo">
                <label for="clave">Contraseña:</label>
                <input type="password" id="clave" name="clave" required/>
            </div>

            <button type="submit" class="boton">Entrar</button>
        </form>

        <p class="link">
            ¿No tenés cuenta? <a href="registro.html">Registrate acá</a>
        </p>
    </div>
    </>
  )
}

export default Login