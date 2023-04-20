import { useState } from 'react';

import styles from './QuizCreator.module.css';
import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Select from '../../componets/UI/Select/Select';

const QuizCreator = () => {
  // const [quizTitle, setQuizTitle] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [rightAnswer, setRightAnswer] = useState('відповідь');

  const validInputs = {
    question: userQuestion.trim().length > 0,
    option1: option1.trim().length > 0,
    option2: option2.trim().length > 0,
    option3: option3.trim().length > 0,
    option4: option4.trim().length > 0,
    select: rightAnswer!=='відповідь'
  };

  const handlerInputUserQuestion = (e) => {
    setUserQuestion(e.target.value);
  };
  const handlerInputOption1 = (e) => {
    setOption1(e.target.value);
  };
  const handlerInputOption2 = (e) => {
    setOption2(e.target.value);
  };
  const handlerInputOption3 = (e) => {
    setOption3(e.target.value);
  };
  const handlerInputOption4 = (e) => {
    setOption4(e.target.value);
  };

  const handlerSelect = (e) => {
    setRightAnswer(e.target.value);
  };

  const addQuestionHandler = () => {
    const userQuiz = [...quiz];
    const index = userQuiz.length + 1;
    const questionItem = {
      question: userQuestion,
      id: index,
      rightAnswer,
      answers: [
        { text: option1, id: `${option1}-${rightAnswer}` },
        { text: option2, id: `${option2}-${rightAnswer}` },
        { text: option3, id: `${option3}-${rightAnswer}` },
        { text: option4, id: `${option4}-${rightAnswer}` },
      ],
    };
    userQuiz.push(questionItem);
    setQuiz(userQuiz);
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setUserQuestion('');
    setRightAnswer('відповідь');
  };

  const createQuizHandler = (e) => {
    e.preventDefault();
    console.log(quiz);
  };
  return (
    <div className={styles.quizCreator}>
      <h2>Створення тесту</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <Input
          inputType="text"
          //  onChangeInput={handlerInputTitle}
          placeholder="Назва тесту"
          value={quizTitle}
          inputLabel="Назва тесту"
          valid={quizTitle.trim().length > 0}
        /> */}
        <Input
          inputType="text"
          onChangeInput={handlerInputUserQuestion}
          placeholder="Питання"
          value={userQuestion}
          inputLabel={`Питання ${quiz.length+1}`}
          valid={validInputs.question}
          tached={true}
        />
        <hr />
        <p>Варіанти відповіді:</p>
        <div className={styles.answerOptions}>
          <Input
            inputType="text"
            onChangeInput={handlerInputOption1}
            placeholder="варіант 1"
            value={option1}
            inputLabel="1."
            valid={validInputs.option1}
            tached={true}
          />
          <Input
            inputType="text"
            onChangeInput={handlerInputOption2}
            placeholder="варіант 2"
            value={option2}
            inputLabel="2."
            valid={validInputs.option2}
            tached={true}
          />
          <Input
            inputType="text"
            onChangeInput={handlerInputOption3}
            placeholder="варіант 3"
            value={option3}
            inputLabel="3."
            valid={validInputs.option3}
            tached={true}
          />
          <Input
            inputType="text"
            onChangeInput={handlerInputOption4}
            placeholder="варіант 4"
            value={option4}
            inputLabel="4."
            valid={validInputs.option4}
            tached={true}
          />
        </div>
        <Select
          onchange={handlerSelect}
          label="№ вірної відповіді"
          value={rightAnswer}
          optionsAnswer={[
            { text: option1, value: 1 },
            { text: option2, value: 2 },
            { text: option3, value: 3 },
            { text: option4, value: 4 },
          ]}
          valid={validInputs.select}
        />
        <div className={styles.quizCreatorActive}>
          <Button
            onclick={addQuestionHandler}
            type="primary"
            valid={
              validInputs.option4 &&
              validInputs.option3 &&
              validInputs.option2 &&
              validInputs.option1 &&
              validInputs.select &&
              validInputs.question
            }
          >
            {!quiz.length?'Додати питання':'Додати ще питання'}
          </Button>
          <Button onclick={createQuizHandler} type="success" valid={true}>
            Зберегти тест
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreator;
