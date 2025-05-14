import '../styles/Home.css'
import Portada from "../assets/img/photo-1552346154-21d32810aba3.jpeg"
import Navbar from '../components/navbar'


const Home = () => {
  return (
    <>  
        <Navbar />

      <section className="portada">
        <img src={Portada} alt="Portada" />
      </section>

      <section className="filtro-precio" style={{ margin: "20px 0" }}>
        <label htmlFor="filtroPrecio">Filtrar por precio (máximo): $</label>
        <input type="number" id="filtroPrecio" placeholder="Ej: 800" />
        <button onClick={() => filtrar()}>Filtrar</button>
      </section>

      <div id="productosContainer"></div>
      <button onClick={() => mostrarTodos()}>Mostrar todos</button>

      <div id="cartSidebar" className="cart-sidebar">
        <div className="cart-header">
          <span className="close-sidebar">&times;</span>
          <h2>Carrito</h2>
        </div>
        <ul id="cartItems"></ul>
        <p>Total: $<span id="cartTotal">0</span></p>
        <a href="/Compras" onClick={() => guardarTotal()}>
          <button className="finalizar-compra-btn">Finalizar compra!</button>
        </a>
      </div>

     

    </>
  )
}

export default Home