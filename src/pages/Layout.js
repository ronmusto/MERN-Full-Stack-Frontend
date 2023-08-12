import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';
import { UserContext } from '../UserContext';

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
                <Link to="/shopping" className={styles.layoutNavLink}>
                  Shopping
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.layoutNavItem}>
                <Link to="/stockai" className={styles.layoutNavLink}>
                  Stock AI
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
