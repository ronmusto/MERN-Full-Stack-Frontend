import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from '../CSS/Layout.module.css';
import { UserContext } from '../components/UserContext';

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.layoutHeader}>
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
            {user && (
              <li className={styles.layoutNavItem}>
                <Link to="/AI" className={styles.layoutNavLink}>
                  House AI
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.layoutNavItem}>
                <Link to="/dashboard" className={styles.layoutNavLink}>
                  Data
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.layoutNavItem}>
                <Link to="/travel" className={styles.layoutNavLink}>
                  Travel
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.layoutNavItem}>
                <Link to="/account" className={styles.layoutNavLink}>
                  Account
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
