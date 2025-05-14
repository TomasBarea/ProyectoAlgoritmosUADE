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
          <li><a href="#">Usuario</a></li>
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
            </div>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar