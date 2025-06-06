import { usePostChat } from 'src/services/chat.service';
import Input from './components/Input';
import { useState } from 'react';
import { useGetProject } from 'src/services/project.service';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Banner from './components/Banner';
import MockNewChat from './components/MockNewChat';

const NewChatPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data: project } = useGetProject(projectId ?? '');
  const brandName = project?.brandName ?? '';

  const { mutateAsync: postChat, isPending: isPosting } = usePostChat();
  const [value, setValue] = useState('');

  const handleSubmit = async (value: string) => {
    try {
      const newChat = await postChat({
        projectId: projectId ?? '',
        initialMessage: value,
      });
      navigate(`/project/${projectId}/chat/${newChat.id}?isNew=true`);
    } catch (error) {
      console.error(error);
      toast.error('채팅 생성에 실패했습니다.');
    }
  };

  const handleQuestionClick = (question: string) => {
    setValue(question);
    handleSubmit(question);
  };

  return (
    <>
      <section className='relative flex-1 overflow-y-auto pb-140 pt-24'>
        {!isPosting ? (
          <Banner
            brandName={brandName}
            handleQuestionClick={handleQuestionClick}
          />
        ) : (
          <MockNewChat content={value} />
        )}
      </section>
      <Input
        value={value}
        onChange={setValue}
        onSubmit={() => handleSubmit(value)}
        disabled={isPosting}
      />
    </>
  );
};

export default NewChatPage;
