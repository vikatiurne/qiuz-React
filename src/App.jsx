import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" index element={<QuizList />} />
          <Route path="auth" element={<Auth />} />
          <Route path="quiz-creator" element={<QuizCreator />} />
          <Route path="quiz/:id" element={<Quiz />} />
        </Routes>
        {/* <Quiz /> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
