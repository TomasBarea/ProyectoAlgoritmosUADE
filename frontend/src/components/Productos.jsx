import { useEffect, useState } from 'react';
import '../styles/Productos.css'; 

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [precio, setPrecio] = useState('');

  const cargarTodos = () => {
    fetch('http://localhost:5000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  };

  useEffect(() => {
    cargarTodos(); 
  }, []);

  const filtrar = () => {
    fetch(`http://localhost:5000/api/filtrar?precio=${precio}`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al filtrar:", err));
  };

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
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
        <label>Filtrar por precio (máximo): $</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={filtrar}>Filtrar</button>
        <button onClick={cargarTodos} style={{ marginLeft: '10px' }}>
          Reiniciar Filtro
        </button>
      </section>

      <div id="productosContainer" className="productos-grid">
        {productos.length > 0 ? (
          productos.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p><strong>Precio:</strong> ${p.precio}</p>
              <p>{p.descripcion}</p>
              <button onClick={() => agregarAlCarrito(p)}>Agregar al carrito</button>
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
