import cartIcon from '../assets/icons/shopping-cart_4058250.png'

import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
         <nav className="nav">
        <ul className="links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <h4 className="titulo">HYPE RESELLERS</h4>
        <ul className="items">
          <li>
            {/* <button onClick={() => document.getElementById('modalPerfil').style.display = 'block'}>
              Ver Perfil
            </button>

            <div id="modalPerfil" style={{display: 'none',position: 'fixed',top: '20%',left: '50%',transform: 'translate(-50%, -20%)',backgroundColor: 'white',padding: '20px',border: '1px solid #ccc',borderRadius: '10px',zIndex: 1000}}>
              <h2>Perfil de Usuario</h2>
              <p><strong>Usuario:</strong> {usuarioInfo.usuario}</p>
              <p><strong>Contraseña:</strong> {usuarioInfo.clave}</p>
              <button onClick={() => document.getElementById('modalPerfil').style.display = 'none'}>Cerrar</button>
            </div>
          </li>
          <li>
            <div id="cartContainer" style={{ position: "relative", display: "inline-block" }}>
              <img
                src={cartIcon}
                id="cartIcon"
                alt="Carrito"
                style={{ width: "30px", cursor: "pointer" }}
              />
              <span id="cartCount" style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                display: "none"
              }}>0</span>
            </div> */}
          </li>
        </ul>
      </nav>
  )
}

export default Navbar