fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        let productosDiv = document.getElementById('productos');
        
        data.forEach(zapatilla => {
            let productoHTML = `
                <div class="producto">
                    <img src="${zapatilla.imagen}">
                    <h3>${zapatilla.nombre}</h3>
                    <p>Marca: ${zapatilla.marca}</p>
                    <p>Precio: $${zapatilla.precio}</p>
                    <p>${zapatilla.descripcion}</p>
                </div>
            `;
            productosDiv.innerHTML += productoHTML;
        });
    })
    
