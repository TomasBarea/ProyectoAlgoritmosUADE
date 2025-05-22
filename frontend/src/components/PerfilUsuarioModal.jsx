const PerfilUsuarioModal = ({ usuario, clave, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Perfil de usuario</h3>
        <p><strong>Usuario:</strong> {usuario}</p>
        <p><strong>Contraseña:</strong> {clave}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PerfilUsuarioModal;
