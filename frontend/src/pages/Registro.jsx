import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [repetirClave, setRepetirClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async () => {
  
    if (!usuario || !email || !clave || !repetirClave) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (clave !== repetirClave) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/validar?usuario=${usuario}&clave=${clave}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.errores.join(', '));
      } else {
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('clave', clave);
        localStorage.setItem('email', email);
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      setError('Error al registrar.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <input
        type="password"
        placeholder="Repetir contraseña"
        value={repetirClave}
        onChange={(e) => setRepetirClave(e.target.value)}
      />
      <button onClick={handleRegistro}>Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Registro;
