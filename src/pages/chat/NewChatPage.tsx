import { usePostChat } from 'src/services/chat.service';
import Input from './components/Input';
import { useState } from 'react';
import { useGetProject } from 'src/services/project.service';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MOCK_QUESTIONS = [
  '지난주에 어떤 지역이 핫했어?',
  '내가 만들고자하는 팝업스토어와 비슷한 컨셉을 가진 사례를 알려줘',
  '최근 팝업스토어 중 가장 인기있는 컨셉은 뭐야?',
];

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
      <section className='relative flex-1 overflow-y-auto pb-200 pt-24'>
        {!isPosting && (
          <>
            <h2 className='absolute left-1/2 top-[35%] -translate-x-1/2 bg-gradient-to-r from-primary-500 to-[#00CCCC] bg-clip-text text-24 font-500 text-transparent'>
              {brandName} 팝업스토어를 어디에 개설할까요?
            </h2>
            <div className='absolute bottom-[20%] left-1/2 flex -translate-x-1/2 flex-col gap-[2px] text-left'>
              {MOCK_QUESTIONS.map((question) => (
                <p
                  key={question}
                  onClick={() => handleQuestionClick(question)}
                  className='cursor-pointer text-14 font-400 text-grey-600 underline underline-offset-2 transition-all duration-150 hover:text-primary-500'
                >
                  {question}
                </p>
              ))}
            </div>
          </>
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
