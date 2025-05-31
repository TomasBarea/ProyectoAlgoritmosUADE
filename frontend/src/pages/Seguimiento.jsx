import React from 'react'
import '../styles/Seguimiento.css';
import Navbar from '../components/Navbar';

const Seguimiento = () => {
  return (
    <>
      <Navbar/>

      <div className="container">
        <h1>Seguimiento de envíos</h1>
        <div className="estado">
          <p>Armado</p>
          <p className="actual">Despachado</p>
          <p>En camino</p>
          <p>Entregado</p>
        </div>
      </div>
    </>

  )
}

export default Seguimiento