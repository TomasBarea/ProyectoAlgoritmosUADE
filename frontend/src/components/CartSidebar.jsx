const CartSidebar = ({ cart, onEliminar, total }) => {
  return (
    <div id="cartSidebar" className="cart-sidebar">
      <h2>Carrito</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.nombre} - ${item.precio}
            <button onClick={() => onEliminar(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <span id="cartCount" className="cart-count">0</span>

      <p>Total: ${total}</p>
      <button onClick={() => localStorage.setItem('carritoTotal', total)}>Finalizar compra</button>
    </div>
  );
};

export default CartSidebar;
