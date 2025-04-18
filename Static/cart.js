let productos = [];
let cart = [];

const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const productosContainer = document.getElementById("productosContainer");
const cartSidebar = document.getElementById("cartSidebar");
const closeSidebar = document.querySelector(".close-sidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos();
  })
  .catch(err => console.error("Error cargando productos:", err));


function mostrarProductos() {
  productos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
       <img src="${p.imagen}" alt="${p.nombre}">
        <p>${p.nombre} </p>
        <p> $${p.precio}</p>
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


cartIcon.onclick = () => {
  renderCart();
  cartSidebar.style.display = "block";
};

closeSidebar.onclick = () => {
  cartSidebar.style.display = "none";
};

window.onclick = function (e) {
  if (!cartSidebar.contains(e.target) && e.target !== cartIcon && !cartIcon.contains(e.target)) {
    cartSidebar.style.display = "none";
  }
};

function renderCart() {
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
  cartCount.textContent = cart.length;
  cartCount.style.display = cart.length > 0 ? "inline-block" : "none";
}



// Filter section


function mostrarProductosFiltrados(productos) {
  const contenedor = document.getElementById("productosFiltrados"); contenedor.innerHTML = "";
  if (productos.length === 0) { contenedor.innerHTML = "<p>No se encontraron productos en ese rango de precio.</p>"; 
  return; 
  }
  productos.forEach(prod => {
    const card = document.createElement("div"); card.className = "producto-card";
    card.innerHTML = 
     ` <img src="${prod.imagen}"  
      alt="${prod.nombre}" 
      style="width: 200px;"> <h3>${prod.nombre}</h3> <p><strong>Precio:</strong>$${prod.precio * 1000}</p><p>${prod.descripcion}</p>  `;
    contenedor.appendChild(card);
  })
}

function filtrar() {
  const max = document.getElementById("filtroPrecio").value; fetch(`/filtrar?precio=${max}`) .then(res => res.json()) .then(data => mostrarProductos(data)) .catch(err => console.error("Error al filtrar:", err)); }
window.onload = () => { fetch('/productos.json') .then(res => res.json()) .then(data => mostrarProductosFiltrados(data)); };