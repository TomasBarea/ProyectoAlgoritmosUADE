import { useState } from 'react';
import PerfilUsuarioModal from './PerfilUsuarioModal';
import Carrito from './Carrito';
import icon from '/icons/shopping-cart_4058250.png';
import userIcon from '/icons/8-512.webp';
import '../styles/Navbar.css'; 

const Navbar = () => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const usuario = localStorage.getItem('usuario');
  const clave = localStorage.getItem('clave');

  return (
    <nav className="nav">
      <a href='/home'><h1 className="titulo">HYPE RESELLERS</h1></a>
      <ul className="links">
        <li><button className='iconUser' onClick={() => setMostrarPerfil(true)}> <img src={userIcon}/></button></li>
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
