import React from 'react'
import { Link } from 'react-router-dom'

const Contacto = () => {
  return (
    <>  

    <section className="contacto">
        <div className="container">
            <h2>CONTACTO</h2>
            <form>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required />
                
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required />
                
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
                
                <button type="submit">ENVIAR</button>
            </form>
            <div className="info-contacto">
                <p><strong>Teléfono:</strong> 0800-1011</p>
                <p><strong>Email:</strong>contacto@hyperesellers.com</p>
                <p><strong>Dirección:</strong>Niceto Vega 233</p>
            </div>
            <div className="redes-sociales">
                <a href="imagen">Facebook</a>
                <a href="imagen">Twitter</a>
                <a href="imagen">Instagram</a>
            </div>
        </div>
    </section>
    <footer>
        <p>&copy; 2025 Empresa. Todos los derechos reservados.</p>
    </footer>
    <div className="volver">
          <button><Link to="/">Home</Link></button>

    </div>
    </>
  )
}

export default Contacto