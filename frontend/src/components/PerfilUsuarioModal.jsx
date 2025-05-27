import { useState } from 'react';

const PerfilUsuarioModal = ({ usuario, clave, onClose }) => {
  const [mostrarClave, setMostrarClave] = useState(false);

  const alternarClave = () => {
    setMostrarClave(prev => !prev);
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Perfil de usuario</h3>
        <p><strong>Usuario:</strong> {usuario}</p>
        <p>
          <strong>Contraseña:</strong>{' '}
          {mostrarClave ? clave : '*'.repeat(clave.length)}
          <button
            onClick={alternarClave}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {mostrarClave ? 'Ocultar' : 'Mostrar'}
          </button>
        </p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PerfilUsuarioModal;
