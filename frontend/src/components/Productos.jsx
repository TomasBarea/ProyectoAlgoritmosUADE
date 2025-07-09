import { useEffect, useState } from 'react';
import '../styles/Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [precio, setPrecio] = useState('');
  const [marca, setMarca] = useState('');

  const cargarTodos = () => {
    fetch('http://localhost:5000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  };

  const filtrar = () => {
    fetch(`http://localhost:5000/api/filtrar?precio=${precio}&marca=${marca}`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al filtrar:", err));
  };

  useEffect(() => {
    cargarTodos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    const total = nuevoCarrito.reduce((sum, p) => sum + p.precio, 0);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    localStorage.setItem('totalCarrito', total);
    alert(`${producto.nombre} agregado al carrito`);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = nuevoCarrito.length;
      cartCount.style.display = 'inline-block';
    }
  };

  return (
    <div>
      <section className="filtro-precio" style={{ margin: "20px 0" }}>
        <label>Precio máximo: $</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label style={{ marginLeft: '10px' }}>Marca:</label>
        <select value={marca} onChange={(e) => setMarca(e.target.value)}>
          <option value="">Todas</option>
          <option value="Nike">Nike</option>
          <option value="adidas">Adidas</option>
          <option value="vans">Vans</option>
        </select>
        <button onClick={filtrar} style={{ marginLeft: '10px' }}>Filtrar</button>
        <button onClick={cargarTodos} style={{ marginLeft: '10px' }}>Reiniciar</button>
      </section>

      <div id="productosContainer" className="productos-grid">
        {productos.length > 0 ? (
          productos.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p><strong>Precio:</strong> ${p.precio}</p>
              <p>{p.descripcion}</p>
              {/* <button onClick={() => agregarAlCarrito(p)}>Agregar al carrito</button> */}
              <button onClick={() => agregarAlCarrito(p)}
                disabled={p.stock === 0}
              >
                {p.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;


