import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import styles from './QuizList.module.css';
import Loader from '../../componets/UI/Loader/Loader';

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState('true');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/quizes.json');
        const quizesUpdated = [];
        Object.keys(response.data).forEach((key, i) => {
          quizesUpdated.push({ id: key, title: `Тест №${i + 1}` });
        });
        setQuizes(quizesUpdated);
        setLoading((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.quizList}>
      <div>
        <h1>Оберіть тест</h1>
        {loading ? (
          <Loader />
        ) : (
          <ul>
            {quizes.map((quiz) => {
              return (
                <li key={quiz.id}>
                  <NavLink to={`quiz/${quiz.id}`}>{quiz.title}</NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizList;
