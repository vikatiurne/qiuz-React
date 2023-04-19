import { NavLink } from 'react-router-dom';

import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './Drawer.module.css';
import { links } from '../../../data/links';

const Drawer = ({ isOpen, onClose }) => {
  return (
    <>
      <nav className={`${styles.drawer} ${isOpen ? styles.close : null}`}>
        <ul>
          {links.map((link) => {
            return (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  // exact={link.exact}
                  className={styles.active}
                  onClick={() => onClose()}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      {!isOpen && <Backdrop onclick={onClose} />}
    </>
  );
};

export default Drawer;
