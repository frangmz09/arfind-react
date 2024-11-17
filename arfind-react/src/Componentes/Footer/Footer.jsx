import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>© 2024 ARfind</p>
        </div>
        <div className={styles.footerRight}>
          <a
            href="https://sites.google.com/view/arfind-faq/inicio"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ
          </a>
          <a
            href="https://sites.google.com/view/tyc-arfind/inicio"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
