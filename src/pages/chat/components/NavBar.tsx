import { IconAdd } from 'public/icons';
import { IconHamburger } from 'public/icons';
import { useNavigate } from 'react-router-dom';
import { Chat } from 'src/types/chat.type';

interface Props {
  projectId: string;
  chats: Chat[];
  currentChatId: string | undefined;
}

const NavBar = ({ projectId, chats, currentChatId }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className='group relative h-full w-72'>
      <div className='absolute bottom-0 left-0 top-0 z-nav flex w-[70px] flex-col items-center gap-24 border-r border-grey-300/50 bg-grey-200 py-12'>
        <IconHamburger width={40} height={30} />
        <button
          className='h-40 w-40 rounded-full bg-grey-300/50'
          onClick={() => {
            navigate(`/project/${projectId}`);
          }}
        >
          <IconAdd width={40} height={30} />
        </button>
      </div>
      <div className='absolute bottom-0 left-[-130px] top-0 z-base w-200 bg-grey-200/95 px-[10px] py-20 transition-all duration-300 group-hover:translate-x-200'>
        <h2 className='pb-8 text-12 font-400 text-grey-500'>채팅방 목록</h2>
        <ul className='scrollbar-hide h-full overflow-y-auto'>
          {chats.map((chat) => (
            <li key={chat.id} className='border-b border-grey-300/60'>
              <button
                className={`my-12 line-clamp-1 w-full rounded-6 px-4 py-4 text-left text-14 font-500 hover:bg-grey-300/50 ${
                  currentChatId === chat.id
                    ? 'bg-primary-50/50 text-primary-500'
                    : 'text-grey-700'
                }`}
                onClick={() => {
                  navigate(`/project/${chat.projectId}/chat/${chat.id}`);
                }}
              >
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
