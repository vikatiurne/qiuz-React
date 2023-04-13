import styles from './AnswerItem.module.css';

const AnswerItem = ({ answer, onAnswerClick,styleAnswer }) => {

  const classes = [styles.answerItem]
  if(styleAnswer) classes.push(styles[styleAnswer])

  return (
    <li className={classes.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

export default AnswerItem;
