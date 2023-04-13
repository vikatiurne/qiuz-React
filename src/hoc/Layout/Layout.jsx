import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
