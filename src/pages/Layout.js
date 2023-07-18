import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.layoutHeader}>
        <h1 className={styles.layoutLogo}>Renaldo's Website</h1>
        <nav className={styles.layoutNavigation}>
          <ul className={styles.layoutNavList}>
            <li className={styles.layoutNavItem}>
              <Link to="/" className={styles.layoutNavLink}>
                Login
              </Link>
            </li>
            <li className={styles.layoutNavItem}>
              <Link to="/contact" className={styles.layoutNavLink}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
