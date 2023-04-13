import { FiCheck, FiX } from 'react-icons/fi';
import styles from './Finished.module.css';

const Finished = (props) => {
  const { quiz, qtyRightAnswers } = props;
  console.log(quiz)
  return (
    <div className={styles.finished}>
      <p className={styles.result}>
        Правильно {qtyRightAnswers} з {quiz.length}
      </p>
      <ul>
        {quiz.map((item) => {
          return (
            <li key={item.id}>
              <p>
                <strong>{item.id}.</strong>&nbsp;{item.question}
              </p>
              {item.result === 'success' ? (
                <FiCheck className={styles.finishedIcon} />
              ) : (
                <FiX className={styles.finishedIcon} />
              )}
            </li>
          );
        })}
        {/* <li>
                    <p>
                        <strong>1.</strong>&nbsp;{question}
                    </p>
                    <FiCheck className={styles.finishedIcon} />
                    </li>
                    <li>
                    <p>
                        <strong>2.</strong>&nbsp;Столиця Німеччини
                    </p>
                    <FiX className={styles.finishedIcon} />
                    </li> */}
      </ul>

      <button>Повторить</button>
    </div>
  );
};

export default Finished;
