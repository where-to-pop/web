import Layout from 'src/components/Layout';
import LoginPage from './pages/login/LoginPage';
import ProjectPage from './pages/project/ProjectPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/project' element={<ProjectPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
