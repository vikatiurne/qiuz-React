import styles from './Button.module.css';

const Button = (props) => {
  const { children, type, onclick } = props;

  const classes = [styles.button, styles[type]];

  return (
    <button onClick={onclick} className={classes.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
