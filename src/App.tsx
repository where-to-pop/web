import Layout from 'src/components/Layout';
import LoginPage from './pages/login/LoginPage';
import ProjectPage from './pages/project/ProjectPage';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat/ChatPage';
import NewChatPage from './pages/chat/NewChatPage';
import ChatLayout from './pages/chat/ChatLayout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='/project/:projectId' element={<ChatLayout />}>
          <Route index element={<NewChatPage />} />
          <Route path='chat/:chatId' element={<ChatPage />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
