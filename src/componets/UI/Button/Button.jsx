import styles from './Button.module.css';

const Button = (props) => {
  const { children, type, onclick,valid } = props;

  const classes = [styles.button, styles[type]];

  return (
    <button onClick={onclick} className={classes.join(' ')} disabled={!valid?true:false}>
      {children}
    </button>
  );
};

export default Button;
