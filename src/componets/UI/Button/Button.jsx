import styles from './Button.module.css';

const Button = (props) => {
  const { children, type, onclick,valid, title } = props;

  const classes = [styles.button, styles[type]];

  return (
    <button onClick={onclick} className={classes.join(' ')} disabled={!valid?true:false} title={title}>
      {children}
    </button>
  );
};

export default Button;
