import { FiCheck, FiX } from 'react-icons/fi';
import Button from '../UI/Button/Button';
import styles from './Finished.module.css';
import { Link } from 'react-router-dom';

const Finished = (props) => {
  const { quiz, qtyRightAnswers, onclick } = props;

  return (
    <div className={styles.finished}>
      <p className={styles.result}>
        Правильно {qtyRightAnswers} з {quiz.length}{' '}
        <span>({((qtyRightAnswers / quiz.length) * 100).toFixed(2)}%)</span>
      </p>
      <ul>
        {quiz.map((item) => {
          return (
            <li key={item.id}>
              <p
                className={`${item.result !== 'success' && styles.errorAnswer}`}
              >
                <strong>{item.id}.</strong>&nbsp;{item.question}{' '}
                {item.result !== 'success'
                  ? `(невірна відповідь - ${item.userAnswer})`
                  : null}
              </p>
              {item.result === 'success' ? (
                <FiCheck className={styles.checkIcon} />
              ) : (
                <FiX className={styles.crossIcon} />
              )}
            </li>
          );
        })}
      </ul>

      <Button onclick={onclick} type="primary" valid={true}>
        Повторити
      </Button>
      <Link to='..'>
        <Button type="success" valid={true}>Перейти до списку тестів</Button>
      </Link>
    </div>
  );
};

export default Finished;
