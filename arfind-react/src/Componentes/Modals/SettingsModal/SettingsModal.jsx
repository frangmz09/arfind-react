import React, { useState, useEffect } from 'react';
import styles from './SettingsModal.module.css';
import userIcon from '/images/account.png';
import Toast from '../../../Componentes/Toast/Toast'; // Asegúrate de importar el Toast correctamente.


const SettingsModal = ({
  onClose,
  onEditName,
  onManageInvites,
  onChangePlan,
  onUnsubscribe,
  onGenerateCode,
  planes = [], // Recibimos los planes como prop
  usuariosInvitados = [], // Lista de usuarios invitados pasada como prop
  codigoInvitado: initialCodigo,
  apodoActual,
}) => {  
  
  const [invites, setInvites] = useState(usuariosInvitados); // Lista inicial de invitados
  const [showRecommendation, setShowRecommendation] = useState(false); // Controla si se muestra la recomendación
  const [inviteToRemove, setInviteToRemove] = useState(null); // Controla el invitado a eliminar
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Controla si el modal de confirmación está abierto  
  const [activeTab, setActiveTab] = useState(null); // Controla el contenido del panel derecho
  const [newName, setNewName] = useState(apodoActual || ''); // Controla el apodo editable
  const [codigoInvitado, setCodigoInvitado] = useState(initialCodigo || null); // Controla el código de invitado
  const [selectedPlan, setSelectedPlan] = useState(''); // Controla el plan seleccionado
  
  const handleRemoveInvite = (invite) => {
    setInviteToRemove(invite); // Establece el invitado a eliminar
    setIsConfirmModalOpen(true); // Abre el modal de confirmación
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  useEffect(() => {
    console.log("Usuarios invitados recibidos:", usuariosInvitados); // Depuración
    setInvites(usuariosInvitados); // Sincroniza con el estado local
  }, [usuariosInvitados]);
  


  const confirmRemoveInvite = async () => {
    try {
      // Usa la función onManageInvites pasada como prop
      await onManageInvites(inviteToRemove.id);
  
      // Actualiza la lista local de invitados
      setInvites((prev) => prev.filter((inv) => inv.id !== inviteToRemove.id));
  
      // Muestra la recomendación para regenerar el código
      setShowRecommendation(true);
    } catch (error) {
      console.error('Error al eliminar invitado:', error);
    } finally {
      setInviteToRemove(null);
      setIsConfirmModalOpen(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    if (codigoInvitado) {
      navigator.clipboard.writeText(codigoInvitado);
      setToastMessage('¡Código copiado al portapapeles!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Oculta el toast después de 3 segundos.
    }
  };


  const cancelRemoveInvite = () => {
    setInviteToRemove(null); // Limpia el invitado seleccionado
    setIsConfirmModalOpen(false); // Cierra el modal
  };
  
  const handleSaveEditName = () => {
    if (newName.trim() !== '') {
      onEditName(newName); // Llama a la función para guardar cambios
    }
  };

  const handleGenerateCodigo = async () => {
    try {
      const nuevoCodigo = await onGenerateCode();
      setCodigoInvitado(nuevoCodigo);
      setToastMessage('¡Código generado con éxito!');
      setShowToast(true);
    } catch (error) {
      console.error('Error generando código:', error);
      setToastMessage('Error al generar el código.');
      setShowToast(true);
    }
  };

  

  const handleChangePlan = () => {
    if (selectedPlan) {
      onChangePlan(selectedPlan); // Llama a la función para cambiar el plan
      setToastMessage(`¡Plan cambiado al ${planes.find(p => p.id === selectedPlan)?.nombre || ''}!`);
      setShowToast(true);
    }
  };
  

  const renderRightContent = () => {
    switch (activeTab) {
      case 'editNickname':
        return (
          <div className={styles.rightPanel}>
            <h2>Editar Apodo</h2>
            <input
              type="text"
              placeholder="Nuevo apodo"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSaveEditName} className={styles.saveButton}>
              Guardar
            </button>
          </div>
        );
      case 'generateCode':
        return (
          <div className={styles.rightPanel}>
            <h2>Generar Código de Invitado</h2>
            <div className={styles.codeContainer}>
              <input
                type="text"
                readOnly
                value={codigoInvitado || 'No se ha generado un código aún.'}
                className={styles.generatedCode}
              />
              {codigoInvitado && (
                <img
                  src="/images/copy.png"
                  alt="Copiar"
                  className={styles.copyIcon}
                  onClick={handleCopyToClipboard}
                />
              )}
            </div>
            <button onClick={handleGenerateCodigo} className={styles.saveButton}>
              Generar Código
            </button>
          </div>
        );
        case 'manageInvites':
          return (
          <div className={styles.rightPanel}>
            <h2 className={styles.manageInvitesTitle}>Gestión de invitados</h2>
            <div className={styles.inviteList}>
              {invites.length > 0 ? (
                invites.map((invite) => (
                  <div key={invite.id} className={styles.inviteItem}>
                    <div className={styles.inviteInfo}>
                      <img src={userIcon} alt="Usuario" className={styles.userIcon} />
                      <span className={styles.inviteName}>{invite.nombre}</span>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveInvite(invite)}
                    >
                      ✖
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay usuarios invitados.</p>
              )}
            </div>
            {showRecommendation && (
              <p className={styles.recommendationText}>
                En caso de eliminar a alguien, se recomienda generar un nuevo código de invitado.
              </p>
            )}
          </div>
        );       
      case 'changePlan':
        return (
          <div className={styles.rightPanel}>
            <h2 className={styles.changePlanTitle}>Cambiar Plan</h2>
            <div className={styles.planContainer}>
              <div className={styles.planSelector}>
                <label htmlFor="plan-select" className={styles.label}>
                  Seleccione un Plan
                </label>
                <select
                  id="plan-select"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className={styles.select}
                >
                  <option value="" disabled>
                    Seleccione un plan
                  </option>
                  {planes.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPlan && (
                <div className={styles.planDetails}>
                  <img
                    src={
                      planes.find((plan) => plan.id === selectedPlan)?.imagen ||
                      'https://placehold.co/50x50.png'
                    }
                    alt={planes.find((plan) => plan.id === selectedPlan)?.nombre}
                    className={styles.planImage}
                  />
                  <div className={styles.planDescription}>
                    <h3>
                      {planes.find((plan) => plan.id === selectedPlan)?.nombre || 'Plan seleccionado'}
                    </h3>
                    <p>
                      {planes.find((plan) => plan.id === selectedPlan)?.descripcion || ''}
                    </p>
                    <div className={styles.planInfo}>
                      <p>
                        <strong>Precio:</strong> $
                        {planes.find((plan) => plan.id === selectedPlan)?.precio}/mes
                      </p>
                      <p>
                        <strong>Cantidad de compartidos:</strong>{' '}
                        {planes.find((plan) => plan.id === selectedPlan)?.cantidad_compartidos || 0}{' '}
                        {planes.find((plan) => plan.id === selectedPlan)?.cantidad_compartidos === 1
                          ? 'persona'
                          : 'personas'}
                      </p>
                      <p>
                        <strong>Refresco:</strong> Cada{' '}
                        {planes.find((plan) => plan.id === selectedPlan)?.refresco || 'N/A'}{' '}
                        {planes.find((plan) => plan.id === selectedPlan)?.refresco === 1
                          ? 'minuto'
                          : 'minutos'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleChangePlan}
              className={styles.changePlanButton}
            >
              Cambiar Plan
            </button>
          </div>
        );
      case 'unsubscribe':
        return (
          <div className={styles.rightPanel}>
            <h2>Darse de Baja</h2>
            <p>¿Estás seguro de que deseas darte de baja? Esta acción no se puede deshacer.</p>
            <button className={styles.deleteButton} onClick={onUnsubscribe}>
              Confirmar Baja
            </button>
          </div>
        );
      default:
        return (
          <div className={styles.rightPanel}>
            <p>Selecciona una opción del menú para continuar.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalBody}>
          <div className={styles.leftPanel}>
            <h3>Configuración del dispositivo</h3>
            <button onClick={() => setActiveTab('editNickname')}>Editar Apodo</button>
            <button onClick={() => setActiveTab('generateCode')}>Código de Invitado</button>
            <h3>Invitados</h3>
            <button onClick={() => setActiveTab('manageInvites')}>Gestión de Invitados</button>
            <h3>Plan de uso</h3>
            <button onClick={() => setActiveTab('changePlan')}>Cambiar Plan</button>
            <button
              className={`${styles.dangerButton} ${styles.unsubscribeButton}`}
              onClick={() => setActiveTab('unsubscribe')}
            >
              Darse de Baja
            </button>
          </div>
          {renderRightContent()}
        </div>
        {isConfirmModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>¿Está seguro que desea eliminar a {inviteToRemove?.nombre} de la lista de invitados?</p>
            <div className={styles.modalButtons}>
              <button onClick={confirmRemoveInvite} className={styles.confirmButton}>
                Sí, eliminar
              </button>
              <button onClick={cancelRemoveInvite} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Renderiza el Toast */}
      {showToast && <Toast message={toastMessage} />} {/* Renderiza el Toast aquí */}
      </div>
    </div>
    
  );
  
};

export default SettingsModal;
