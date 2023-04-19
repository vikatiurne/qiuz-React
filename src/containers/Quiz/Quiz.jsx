import { createContext, useState } from 'react';
import styles from './Quiz.module.css';
import { quizList } from '../../data/quizList';
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz';
import Finished from '../../componets/Finished/Finished';

export const AnswersContext = createContext();
const Quiz = () => {
  
  const [quiz, setQuiz] = useState(quizList);
  const [numQuestion, setNumQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [finished, setFinished] = useState(false);
  const [qtyRightAnswers, setQtyRightAnswers] = useState(0);
  const [repeat, setRepeat] = useState(true);

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
      const uppdateQuiz = [...quiz];
      uppdateQuiz[numQuestion].result = 'success';
      const userAnswer = quiz[numQuestion].answers[id - 1].text;
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
      const userAnswer = quiz[numQuestion].answers[id - 1].text;
      uppdateQuiz[numQuestion].userAnswer = userAnswer;
      setQuiz(uppdateQuiz);

      //   переход к след вопросу
      setNextQuestion();
    }
  };

  const onRepeatHandler = () => {
    setRepeat(repeat);
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
        <h1>Quiz Title</h1>
        {!finished && repeat ? (
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
