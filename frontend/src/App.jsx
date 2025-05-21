import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';  

import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/SobreNosotros';

function App() {
  return (
    <Router>
      <nav className="nav">
        {/* Navigation links */}
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/sobre-nosotros" element={<SobreNosotros/>} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;
