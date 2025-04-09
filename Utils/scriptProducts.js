fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
        let productosDiv = document.getElementById('productos');
        let html = '';

        data.forEach(productos => {
            html += `
                <div class="producto">
                    <img src="${productos.imagen}" alt="${productos.nombre}">
                    <h3>${productos.nombre}</h3>
                    <p>Marca: ${productos.marca}</p>
                    <p>Precio: $${productos.precio}</p>
                    <p>${productos.descripcion}</p>
                </div>
            `;
        });

        productosDiv.innerHTML = html; 
    })
    .catch(error => console.error("Error cargando el JSON:", error));