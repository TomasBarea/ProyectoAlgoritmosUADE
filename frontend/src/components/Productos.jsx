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
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    localStorage.setItem('totalCarrito', total);
    alert(`${producto.nombre} agregado al carrito`);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = carrito.length;
      cartCount.style.display = 'inline-block';
    }

    setProductos(prevProductos =>
      prevProductos.map(p =>
        p.id === producto.id
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  };

  return (
    <div>
      <section className="filtro-precio">
        <label>Filtrar por precio (máximo): $</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={filtrar} className="filtrar">Filtrar</button>
        <button onClick={cargarTodos} className="reiniciar">
          Reiniciar Filtro
        </button>
      </section>

      <div id="productosContainer" className="productos-grid">
        {productos.length > 0 ? (
          productos.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
              <p><strong>Precio:</strong> ${p.precio}</p>
              <p><strong>Stock disponible:</strong> {p.stock}</p>
          
              <button
                onClick={() => agregarAlCarrito(p)}
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


