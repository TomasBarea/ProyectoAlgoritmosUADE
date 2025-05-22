import { useState } from 'react';
import { Link } from 'react-router-dom';
import PerfilUsuarioModal from './PerfilUsuarioModal';
import Carrito from './Carrito';
import icon from '../assets/icons/shopping-cart_4058250.png';
import '../styles/Navbar.css'; 

const Navbar = () => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const usuario = localStorage.getItem('usuario');
  const clave = localStorage.getItem('clave');

  return (
    <nav className="nav">
      <h1 className="titulo">HYPE RESELLERS</h1>
      <ul className="links">
        <li><Link to="/home">Inicio</Link></li>
        <li><Link to="/compras">Compras</Link></li>
        <li><button onClick={() => setMostrarPerfil(true)}>Perfil</button></li>
        <li className="iconoCarrito"><button onClick={() => setMostrarCarrito(!mostrarCarrito)}><img src= {icon}/><span id="cartCount" className="cart-count">0</span>
</button></li>
      </ul>

      {mostrarPerfil && (
        <PerfilUsuarioModal
          usuario={usuario}
          clave={clave}
          onClose={() => setMostrarPerfil(false)}
        />
      )}

      {mostrarCarrito && <Carrito />}
    </nav>
  );
};

export default Navbar;
