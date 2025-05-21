import '../styles/Home.css';
import Portada from "../assets/img/photo-1552346154-21d32810aba3.jpeg";
import Navbar from '../components/navbar';
import { useEffect, useState } from 'react';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [precioFiltro, setPrecioFiltro] = useState('');
  
  const [usuarioInfo, setUsuarioInfo] = useState({ usuario: '', clave: '' });

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const clave = localStorage.getItem('clave');
  setUsuarioInfo({ usuario, clave });
}, []);

  useEffect(() => {
   
    fetch('http://localhost:5000/api/filtrar?precio=500')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al conectar con el backend:", err));
  }, []);

  const filtrar = () => {
    const precio = precioFiltro || 999999;
    fetch(`http://localhost:5000/api/filtrar?precio=${precio}`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al filtrar:", err));
  };

  const mostrarTodos = () => {
    setPrecioFiltro('');
    filtrar();
  };

  return (
    <>  
      <Navbar />

      <section className="portada">
        <img src={Portada} alt="Portada" />
      </section>

<button onClick={() => document.getElementById('modalPerfil').style.display = 'block'}>
  Ver Perfil
</button>

<div id="modalPerfil" style={{
  display: 'none',
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  zIndex: 1000
}}>
  <h2>Perfil de Usuario</h2>
  <p><strong>Usuario:</strong> {usuarioInfo.usuario}</p>
  <p><strong>Contraseña:</strong> {usuarioInfo.clave}</p>
  <button onClick={() => document.getElementById('modalPerfil').style.display = 'none'}>Cerrar</button>
</div>


      <section className="filtro-precio" style={{ margin: "20px 0" }}>
        <label htmlFor="filtroPrecio">Filtrar por precio (máximo): $</label>
        <input
          type="number"
          id="filtroPrecio"
          placeholder="Ej: 800"
          value={precioFiltro}
          onChange={(e) => setPrecioFiltro(e.target.value)}
        />
        <button onClick={filtrar}>Filtrar</button>
      </section>

      <section className="productos">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul>
            {productos.map((producto, index) => (
              <li key={index}>
                <strong>{producto.nombre}</strong> - ${producto.precio}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={mostrarTodos}>Mostrar todos</button>

      <div id="cartSidebar" className="cart-sidebar">
        <div className="cart-header">
          <span className="close-sidebar">&times;</span>
          <h2>Carrito</h2>
        </div>
        <ul id="cartItems"></ul>
        <p>Total: $<span id="cartTotal">0</span></p>
        <a href="/Compras" onClick={() => {/* guardarTotal() aún no implementado */}}>
          <button className="finalizar-compra-btn">Finalizar compra!</button>
        </a>
      </div>
    </>
  );
};

export default Home;
