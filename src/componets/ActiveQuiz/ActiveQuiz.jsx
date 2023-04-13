import styles from './ActiveQuiz.module.css';
import AnswersList from '../AnswersList/AnswersList';

const ActiveQuiz = (props) => {
  const {
    answers,
    question,
    onAnswerClick,
    numQuestion,
    qtyQuestions,
    styleAnswer,
  } = props;

  return (
    <div className={styles.activeQuiz}>
      <p className={styles.question}>
        <span>
          <strong>{numQuestion}.</strong>&nbsp;
          {question}
        </span>
        <small>
          {numQuestion} з {qtyQuestions}
        </small>
      </p>
      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        styleAnswer={styleAnswer}
      />
    </div>
  );
};

export default ActiveQuiz;
