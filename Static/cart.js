let productos = [];
let cart = [];

const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const productosContainer = document.getElementById("productosContainer");
const cartSidebar = document.getElementById("cartSidebar");
const closeSidebar = document.querySelector(".close-sidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

fetch("/static/productos.json")
  .then(res => res.json())
  .then(data => {
    console.log("Productos cargados:", data);
  })
  .catch(err => console.error("Error cargando productos:", err));



function mostrarProductos() {
  productosContainer.innerHTML = ""; 
  productos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div>
        <img src="${p.imagen}" alt="${p.nombre}" style="width: 200px;">
        <p>${p.nombre}</p>
        <p>$${p.precio}</p>
        <p>${p.descripcion}</p>
        <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      </div>
    `;
    productosContainer.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    cart.push(producto);
    actualizarContador();
    alert(`${producto.nombre} agregado al carrito`);
  }
}

if (cartIcon) {
  cartIcon.onclick = () => {
    renderCart();
    if (cartSidebar) cartSidebar.style.display = "block";
  };
}

if (closeSidebar) {
  closeSidebar.onclick = () => {
    if (cartSidebar) cartSidebar.style.display = "none";
  };
}

window.onclick = function (e) {
  if (cartSidebar && !cartSidebar.contains(e.target) && e.target !== cartIcon && !cartIcon?.contains(e.target)) {
    cartSidebar.style.display = "none";
  }
};

function renderCart() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    cartItems.appendChild(li);
    total += item.precio;
  });
  cartTotal.textContent = total;
}

function actualizarContador() {
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

// Filtro de productos
function mostrarProductosFiltrados(filtrados) {
  if (!productosContainer) return;

  productosContainer.innerHTML = "";
  if (filtrados.length === 0) {
    productosContainer.innerHTML = "<p>No se encontraron productos en ese rango de precio.</p>";
    return;
  }

  filtrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 200px;">
      <h3>${prod.nombre}</h3>
      <p><strong>Precio:</strong> $${prod.precio}</p>
      <p>${prod.descripcion}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(card);
  });
}

function filtrar() {
  const maxInput = document.getElementById("filtroPrecio");
  if (!maxInput) return;

  const max = maxInput.value;
  fetch(`/filtrar?precio=${max}`)
    .then(res => res.json())
    .then(data => mostrarProductosFiltrados(data))
    .catch(err => console.error("Error al filtrar:", err));
}

function mostrarTodos() {
  if (productosContainer) mostrarProductos(); 
}

// Cálculo de envío
const matrizCostos = [1000, 1500, 2500, 4000];

function calcularEnvio() {
  const zonaSelect = document.getElementById("zonaSelect");
  const envioTotal = document.getElementById("envioTotal");
  const totalFinal = document.getElementById("totalFinal");
  const totalProductos = document.getElementById("cartTotal");

  if (!zonaSelect || !envioTotal || !totalFinal || !totalProductos) return;

  const zona = zonaSelect.value;
  const costoEnvio = matrizCostos[zona] || 0;
  const totalCarrito = parseFloat(totalProductos.textContent) || 0;

  const total = totalCarrito + costoEnvio;

  envioTotal.textContent = costoEnvio;
  totalFinal.textContent = total;
}
