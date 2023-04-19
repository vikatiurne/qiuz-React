import { v4 as uuidv4 } from 'uuid';
import styles from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

const QuizList = () => {
  return (
    <div className={styles.quizList}>
      <div>
        <h1>Перелік тестів</h1>
        <ul>
          {[1, 2, 3].map((quiz) => {
            return (
              <li key={uuidv4()}>
                <NavLink to={`quiz/${quiz}`}>Тест {quiz}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
