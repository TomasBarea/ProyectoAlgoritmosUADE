import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Compras = () => {
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  useEffect(() => {
    const totalGuardado = localStorage.getItem("totalCarrito");
    if (totalGuardado) {
      setTotalCarrito(parseFloat(totalGuardado));
    }
  }, []);

  const calcularEnvio = (zonaIndex) => {
    const matrizCostos = [1000, 1500, 2500, 4000];
    const envio = matrizCostos[zonaIndex];
    const total = totalCarrito + envio;

    setCostoEnvio(envio);
    setTotalFinal(total);
  };

  return (
    <div>
      
      <h2>Informacion de compra</h2>
      
      <label>Ingrasa tu telefono</label>
      <input type="number" placeholder="Teléfono" />

      <label>Ingrasa tu Email</label>
      <input type="email" placeholder="Email" />


      <label>Seleccioná tu zona:</label>
      <select onChange={(e) => calcularEnvio(Number(e.target.value))}>
        <option value="">Elegir zona</option>
        <option value="0">Zona 1</option>
        <option value="1">Zona 2</option>
        <option value="2">Zona 3</option>
        <option value="3">Zona 4</option>
      </select>

      <p>Total del carrito: ${totalCarrito}</p>
      <p>Costo de envío: ${costoEnvio}</p>
      <p>Total final: ${totalFinal}</p>

      <button><Link to={"/seguimiento"}>Finalizar Compre!</Link></button>
    </div>

    
  );
};

export default Compras;

