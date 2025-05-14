let productos = [];
let cart = [];

const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const productosContainer = document.getElementById("productosContainer");
const cartSidebar = document.getElementById("cartSidebar");
const closeSidebar = document.querySelector(".close-sidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

fetch("../productos.json") 
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos(); 
  })
  .catch(err => console.error("Error cargando productos:", err));



  function mostrarProductos() {
    if (!productosContainer) return; 
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

  localStorage.setItem("montoCarrito", total);

}

function actualizarContador() {
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

function guardarTotal() {
  const total = document.getElementById("cartTotal").textContent;
  localStorage.setItem("carritoTotal", total);
}

const finalizarBtn = document.querySelector(".finalizar-compra-btn");
if (finalizarBtn) {
  finalizarBtn.addEventListener("click", () => {
    localStorage.setItem("totalCarrito", cartTotal.textContent);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const totalGuardado = localStorage.getItem("montoCarrito");
  if (totalGuardado && document.getElementById("cartTotal")) {
    document.getElementById("cartTotal").textContent = totalGuardado;
  }
});



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

// Cálculo de envío -----------------------------------------------------------------------------

if (window.location.pathname.includes("compras.html")) {
  window.addEventListener("DOMContentLoaded", () => {
 
    const totalGuardado = localStorage.getItem("totalCarrito");
    if (totalGuardado) {
      const cartTotalEl = document.getElementById("cartTotal");
      if (cartTotalEl) {
        cartTotalEl.textContent = totalGuardado;
      }
    }


    const matrizCostos = [1000, 1500, 2500, 4000];

    window.calcularEnvio = function () {
      const zona = document.getElementById("zonaSelect").value;
      const costoEnvio = matrizCostos[zona];
      const totalCarrito = parseFloat(document.getElementById("cartTotal").textContent);
      const totalFinal = totalCarrito + costoEnvio;

      document.getElementById("envioTotal").textContent = costoEnvio;
      document.getElementById("totalFinal").textContent = totalFinal;
    };
  });
}


async function fetchCart() {
  try {
    const response = await fetch('/cart', { method: 'GET' });
    const data = await response.json();
    cart = data.cart || [];
    renderCart();
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

async function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    try {
      const response = await fetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: producto }),
      });
      const data = await response.json();
      cart = data.cart || [];
      renderCart();
      alert(data.message || `${producto.nombre} agregado al carrito`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
}


async function eliminarDelCarrito(id) {
  const producto = cart.find(p => p.id === id);
  if (producto) {
    try {
      const response = await fetch('/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: producto }),
      });
      const data = await response.json();
      cart = data.cart || [];
      renderCart();
      alert(data.message || `${producto.nombre} eliminado del carrito`);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }
}


function renderCart() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.onclick = () => eliminarDelCarrito(item.id);
    li.appendChild(removeButton);
    cartItems.appendChild(li);
    total += item.precio;
  });

  cartTotal.textContent = total.toFixed(2);
  actualizarContador();
  localStorage.setItem('montoCarrito', total);
}


function actualizarContador() {
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
  }
}


function guardarTotal() {
  const total = document.getElementById('cartTotal').textContent;
  localStorage.setItem('carritoTotal', total);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCart();

  const totalGuardado = localStorage.getItem('montoCarrito');
  if (totalGuardado && document.getElementById('cartTotal')) {
    document.getElementById('cartTotal').textContent = totalGuardado;
  }
});