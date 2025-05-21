import React from 'react'

const Compras = () => {
  return (
    <>  
      
    <div>
        <h4>Ingresa tus datos</h4>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Telefono" />
    
        <h4>Calcular envío:</h4>
        <input type="text" placeholder="Ciudad" />
        <input type="text" placeholder="Comuna" />
        <input type="text" placeholder="Dirección" />
        <input type="text" placeholder="Código postal" />
    
        <label for="zonaSelect">Seleccioná tu zona:</label>
        <select id="zonaSelect">
          <option value="0">CABA</option>
          <option value="1">Zona Oeste</option>
          <option value="2">Zona Sur</option>
          <option value="3">Interior del país</option>
        </select>
    
        <button onClick={() => calcularEnvio()}>Calcular envío</button>
    
        <p>Total productos: $<span id="cartTotal">0</span></p>
        <p>Costo de envío: $<span id="envioTotal">0</span></p>
        <p><strong>Total a pagar: $<span id="totalFinal">0</span></strong></p>
    
        <a href="./seguimiento.html"><button>Finalizar compra!</button></a>
      </div>
    </>
  )
}

export default Compras