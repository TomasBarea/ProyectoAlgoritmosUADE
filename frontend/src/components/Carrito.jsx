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
    localStorage.setItem("carritoTotal", total);
  };

  return (
    <div id="cartSidebar" className="cart-sidebar">
      <div className="cart-header">
        <span className="close-sidebar">&times;</span>
        <h2>Carrito</h2>
              <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.nombre} - ${item.precio}</li>
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
