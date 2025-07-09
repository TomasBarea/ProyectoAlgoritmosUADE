import { useEffect, useState } from 'react';

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCart(carritoGuardado);
    setTotal(carritoGuardado.reduce((acc, item) => acc + item.precio, 0));
  }, []);

  const guardarTotal = () => {
    localStorage.setItem("totalCarrito", total);
  };


  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...cart];
    nuevoCarrito.splice(index, 1);
    setCart(nuevoCarrito);

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    const nuevoTotal = nuevoCarrito.reduce((sum, p) => sum + p.precio, 0);
    setTotal(nuevoTotal);
  };




  return (
    <div id="cartSidebar" className="cart-sidebar">
      <div className="cart-header">
        <h2>Carrito</h2>
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.nombre} - ${item.precio}
              <button onClick={() => eliminarDelCarrito(i)} className="btn-borrar">
                Borrar
              </button>
            </li>
          ))}

        </ul>
        <p>Total: $<span>{total}</span></p>
        <a href="/Compras" onClick={guardarTotal}>
          <button className="finalizar-compra-btn">Finalizar compra!</button>
        </a>
      </div>
    </div>

  );
};

export default Carrito;
