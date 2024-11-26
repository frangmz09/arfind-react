import React from 'react';

const InvitadosList = ({ invitedUsers, onRemove }) => {
  return (
    <div>
      <h3>Gestionar Invitados</h3>
      <ul className="invited-list">
        {invitedUsers.map((email, index) => (
          <li key={index}>
            {email}
            <button
              className="remove-invited-btn"
              onClick={() => onRemove(email)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvitadosList;
