import { useGetChats } from 'src/services/chat.service';
import Input from './components/Input';
import NavBar from './components/NavBar';
import { useMemo, useState } from 'react';
import { useGetProject } from 'src/services/project.service';
import { useParams } from 'react-router-dom';
import Header from './components/Header';

const NewChatPage = () => {
  const { projectId } = useParams();

  const { data: project } = useGetProject(Number(projectId));
  const brandName = project?.brandName ?? '';

  const { data: chats } = useGetChats();
  const chatsOfProject = useMemo(
    () => chats?.filter((chat) => chat.projectId === Number(projectId)) ?? [],
    [chats, projectId],
  );

  const [value, setValue] = useState('');

  // TODO: 새로운 채팅 생성 기능 추가
  const handleSubmit = () => {};

  return (
    <div className='flex h-full w-full'>
      <NavBar chats={chatsOfProject} />
      <main className='relative flex flex-1 flex-col'>
        <Header projectId={Number(projectId)} />
        <section className='relative flex-1 overflow-y-auto pb-200 pt-24'>
          <h2 className='absolute left-1/2 top-[35%] -translate-x-1/2 bg-gradient-to-r from-primary-500 to-[#00CCCC] bg-clip-text text-24 font-500 text-transparent'>
            {brandName} 팝업스토어를 어디에 개설할까요?
          </h2>
        </section>
        <Input value={value} onChange={setValue} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default NewChatPage;
