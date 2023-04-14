import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './Drawer.module.css';

const Drawer = ({ isOpen,onClose }) => {
  const links = [1, 2, 3];
  const linkList = links.map((link, i) => {
    return <li key={i}>Link {link}</li>;
  });

  return (
    <>
      <nav className={`${styles.drawer} ${isOpen ? styles.close : null}`}>
        <ul>{linkList}</ul>
      </nav>
      {!isOpen && <Backdrop onclick={onClose} />}
    </>
  );
};

export default Drawer;
