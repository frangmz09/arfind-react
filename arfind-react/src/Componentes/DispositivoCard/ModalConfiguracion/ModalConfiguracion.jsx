import React, { useState } from 'react';
import './ModalConfiguracion.css';

const ModalConfiguracion = ({
  onClose,
  onEditName,
  onGenerateCodigo,
  onChangePlan,
  onUnsubscribe,
  invitedUsers,
  onRemoveInvitedUser,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderRightContent = () => {
    switch (selectedOption) {
      case 'editNickname':
        return (
          <div className="right-content">
            <h2>Editar Apodo</h2>
            <input
              type="text"
              placeholder="Nuevo apodo"
              onChange={(e) => onEditName(e.target.value)}
              className="input"
            />
            <button className="save-button">Guardar</button>
          </div>
        );
      case 'manageInvitedUsers':
        return (
          <div className="right-content">
            <h2>Gestionar Invitados</h2>
            <ul>
              {invitedUsers.map((user) => (
                <li key={user}>
                  {user}
                  <button onClick={() => onRemoveInvitedUser(user)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'changePlan':
        return (
          <div className="right-content">
            <h2>Cambiar Plan</h2>
            <select onChange={(e) => onChangePlan(e.target.value)} className="select">
              <option value="basic">Básico - $10/mes</option>
              <option value="pro">Pro - $20/mes</option>
              <option value="premium">Premium - $30/mes</option>
            </select>
            <button className="save-button">Guardar</button>
          </div>
        );
      case 'unsubscribe':
        return (
          <div className="right-content">
            <h2>Darse de Baja</h2>
            <p>¿Estás seguro de que deseas darte de baja? Esta acción no se puede deshacer.</p>
            <button onClick={onUnsubscribe} className="delete-button">
              Sí, darse de baja
            </button>
          </div>
        );
      default:
        return <div className="right-content">Selecciona una opción para continuar</div>;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <div className="left-panel">
            <h3>Configuración del dispositivo</h3>
            <button onClick={() => setSelectedOption('editNickname')}>Editar Apodo</button>
            <button onClick={() => setSelectedOption('manageInvitedUsers')}>Gestión de Invitados</button>
            <h3>Plan de uso</h3>
            <button onClick={() => setSelectedOption('changePlan')}>Cambiar Plan</button>
            <button onClick={() => setSelectedOption('unsubscribe')} className="danger-button">
              Darse de baja
            </button>
          </div>
          <div className="right-panel">{renderRightContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfiguracion;
