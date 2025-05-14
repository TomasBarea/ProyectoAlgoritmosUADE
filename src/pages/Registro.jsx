import React from 'react'

const Registro = () => {
  return (
    <>
        <div class="contenedor">
    <h2>Registrate</h2>
    <form action="/registro" method="POST" class="formulario-registro">
    <div class="campo1">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" name="usuario" required/>
    </div>

    <div class="campo2">
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required/>
   
   
   
    </div>

    
    
    
    <div class="campo3">
        <label for="clave">Contraseña:</label>
        <input type="password" id="clave" name="clave" required/>
    
    
    </div>

    
    
    
    <div class="campo4">
        <label for="confirmar">confirmar contraseña:</label>
            <input type="password" id="confirmar" name="confirmar" required/>
    
    
    
    </div>

    <button type="submit" class="boton">Crear cuenta</button>
    </form>

    <p class="link">
    ¿Ya tenés cuenta? <a href="login.html">Iniciar sesión</a>
    </p>
</div>
    </>
  )
}

export default Registro