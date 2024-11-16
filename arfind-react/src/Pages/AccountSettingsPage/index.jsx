
import React from 'react';
import AccountForm from './AccountForm';
import styles from './AccountSettingsPage.module.css';

const AccountSettingsPage = () => {
  return (
    <div className={styles.accountSettingsPage}>
      <h1 className={styles.accountSettingsPage__title}>Configuración de Cuenta</h1>
      <AccountForm />
    </div>
  );
};

export default AccountSettingsPage;
