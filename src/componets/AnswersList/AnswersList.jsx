import AnswerItem from './AnswerItem/AnswerItem';
import styles from './AnswersList.module.css';

const AnswersList = ({ answers, onAnswerClick, styleAnswer }) => {
  return (
    <ul className={styles.answersList}>
      {answers.map((answer) => {
        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            onAnswerClick={onAnswerClick}
            // проверяем что в состоянии null или объект, если null дальше передаем null
            styleAnswer={styleAnswer ? styleAnswer[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
