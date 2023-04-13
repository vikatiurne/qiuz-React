import { createContext, useState } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz';
import Finished from '../../componets/Finished/Finished';

export const AnswersContext = createContext();
const Quiz = () => {
  const quizList = [
    {
      id: 1,
      question: 'Столиця України',
      rightAnswer: 1,
      answers: [
        { id: 1, text: 'Київ' },
        { id: 2, text: 'Харків' },
        { id: 3, text: 'Львів' },
        { id: 4, text: 'Одеса' },
      ],
    },
    {
      id: 2,
      question: 'Столиця Німеччини',
      rightAnswer: 2,
      answers: [
        { id: 1, text: 'Дюсельдорф' },
        { id: 2, text: 'Берлін' },
        { id: 3, text: 'Мюнхен' },
        { id: 4, text: 'Кельн' },
      ],
    },
    {
      id: 3,
      question: 'Столиця Франции',
      rightAnswer: 4,
      answers: [
        { id: 1, text: 'Ніца' },
        { id: 2, text: 'Бордо' },
        { id: 3, text: 'Ліон' },
        { id: 4, text: 'Париж' },
      ],
    },
  ];
  const [quiz, setQuiz] = useState(quizList);
  const [numQuestion, setNumQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [finished, setFinished] = useState(false);
  const [qtyRightAnswers, setQtyRightAnswers] = useState(0);
//   const [result, setResult] = useState({});

  const onAnswerClickHandel = (id) => {
    // проверка стиля для ответа
    if (answerState !== null) {
      if (answerState[0] === 'success') return;
    }

    // проверка ответа:
    // правильный ответ
    if (id === quiz[numQuestion].rightAnswer) {
      // добавление стиля правильному ответу
      setAnswerState({ [id]: 'success' });
      //   счетчик правильных ответов
      setQtyRightAnswers(qtyRightAnswers + 1);
      const uppdateQuiz=[...quiz]
      uppdateQuiz[numQuestion].result = 'success'
      setQuiz(uppdateQuiz)
    //   setResult({ [id]: 'success' });
      //  переход к след вопросу
      setNextQuestion();

      //   неправильный ответ
    } else {
      // добавление стиля неправильному ответу
      setAnswerState({ [id]: 'error' });
      const uppdateQuiz=[...quiz]
      uppdateQuiz[numQuestion].result = 'wtfk'
      setQuiz(uppdateQuiz)
      //   переход к след вопросу
      setNextQuestion();
      console.log('не правильно');
    }
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
        <h1>Quiz Title</h1>
        {!finished ? (
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
            quiz={quiz}
            qtyRightAnswers={qtyRightAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
