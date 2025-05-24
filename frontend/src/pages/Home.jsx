import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import Productos from '../components/Productos';


const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/filtrar?precio=500')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <>
      <Navbar />


      {/* <section className="portada">
        <img src="/img/photo-1552346154-21d32810aba3.jpeg" alt="Portada" />
      </section>     */}
      
      <Productos/>

    </>
  );
};

export default Home;
