import React from 'react';
import { useLocation } from 'react-router-dom';
import './PagoStatus.css'; // Agrega estilos para el mensaje

const PagoStatus = () => {
    const query = new URLSearchParams(useLocation().search);
    const estado = query.get('estado'); // Obtén el estado desde la URL (exitoso, fallo, pendiente)

    let mensaje;
    let clase;

    switch (estado) {
        case 'exitoso':
            mensaje = '¡Gracias por tu compra! El pago fue exitoso. Por favor, revisa tus notificaciones!';
            clase = 'pago-exitoso';
            break;
        case 'fallo':
            mensaje = 'El pago no se pudo completar. Por favor, intenta nuevamente.';
            clase = 'pago-fallido';
            break;
        case 'pendiente':
            mensaje = 'Tu pago está pendiente. Te notificaremos cuando se confirme.';
            clase = 'pago-pendiente';
            break;
        default:
            mensaje = 'Estado desconocido. Por favor, verifica tu transacción.';
            clase = 'pago-desconocido';
    }

    return (
        <div className={`pago-status ${clase}`}>
            <h2>{mensaje}</h2>
            <button className='button-pago' onClick={() => (window.location.href = '/')}>Volver al inicio</button>
        </div>
    );
};

export default PagoStatus;
