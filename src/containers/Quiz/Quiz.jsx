import { createContext, useState, useEffect } from 'react';
import styles from './Quiz.module.css';
import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz';
import Finished from '../../componets/Finished/Finished';
import { useLocation } from 'react-router-dom';
import Loader from '../../componets/UI/Loader/Loader';

export const AnswersContext = createContext();

const Quiz = () => {
  const [numQuestion, setNumQuestion] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [answerState, setAnswerState] = useState(null);
  const [finished, setFinished] = useState(false);
  const [qtyRightAnswers, setQtyRightAnswers] = useState(0);
  const [repeat, setRepeat] = useState(true);
  const [loading, setLoading] = useState('true');
  const params = useLocation();
  const id = params.pathname.split('/')[params.pathname.split('/').length - 1];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/quizes/${id}.json`);
        setQuiz(response.data);
        setLoading((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const onAnswerClickHandel = (id) => {
    const userAnswer = id.split('-')[0];

    if (!loading) {
      // проверка стиля для ответа
      if (answerState !== null) {
        if (answerState[0] === 'success') return;
      }
      // проверка ответа:
      // правильный ответ
      if (userAnswer === quiz[numQuestion].rightAnswer) {
        // добавление стиля правильному ответу
        setAnswerState({ [id]: 'success' });
        //   счетчик правильных ответов
        setQtyRightAnswers(qtyRightAnswers + 1);
        const uppdateQuiz = [...quiz];
        uppdateQuiz[numQuestion].result = 'success';
        uppdateQuiz[numQuestion].userAnswer = userAnswer;
        setQuiz(uppdateQuiz);
        //  переход к след вопросу
        setNextQuestion();

        //   неправильный ответ
      } else {
        // добавление стиля неправильному ответу
        setAnswerState({ [id]: 'error' });
        const uppdateQuiz = [...quiz];
        uppdateQuiz[numQuestion].result = 'error';
        // const userAnswer = '';
        uppdateQuiz[numQuestion].userAnswer = userAnswer;
        setQuiz(uppdateQuiz);

        //   переход к след вопросу
        setNextQuestion();
      }
    }
  };

  const onRepeatHandler = () => {
    setRepeat(true);
    setFinished(false);
    setQtyRightAnswers(0);
  };

  function isQuizFinished() {
    return numQuestion + 1 === quiz.length;
  }

  function setNextQuestion() {
    // переход к след вопросу
    const timeout = setTimeout(() => {
      if (!isQuizFinished()) {
        setAnswerState(null);
        setNumQuestion(numQuestion + 1);
      } else {
        setAnswerState(null);
        setNumQuestion(0);
        setFinished(true);
      }
      clearTimeout(timeout);
    }, 800);
  }

  return (
    <div className={styles.quiz}>
      <div className="quizWrapper">
        <h1>Столиці</h1>

        {loading ? (
          <Loader />
        ) : !finished && repeat ? (
          <ActiveQuiz
            onAnswerClick={onAnswerClickHandel}
            answers={quiz[numQuestion].answers}
            question={quiz[numQuestion].question}
            numQuestion={numQuestion + 1}
            qtyQuestions={quiz.length}
            styleAnswer={answerState}
          />
        ) : (
          <Finished
            onclick={onRepeatHandler}
            quiz={quiz}
            qtyRightAnswers={qtyRightAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
