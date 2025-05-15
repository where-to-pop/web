import { IconAdd } from 'public/icons';
import { IconHamburger } from 'public/icons';
import { useNavigate } from 'react-router-dom';
import { Chat } from 'src/types/chat.type';

interface Props {
  chats: Chat[];
}

const NavBar = ({ chats }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className='group relative h-full w-72'>
      <div className='absolute bottom-0 left-0 top-0 z-nav flex w-[70px] flex-col items-center gap-24 border-r border-grey-300/50 bg-grey-200 py-12'>
        <IconHamburger width={40} height={30} />
        <button className='h-40 w-40 rounded-full bg-grey-300/50'>
          <IconAdd width={40} height={30} />
        </button>
      </div>
      <div className='absolute bottom-0 left-[-90px] top-0 z-base w-160 bg-grey-200 px-[10px] py-20 transition-all duration-300 group-hover:translate-x-160'>
        <h2 className='pb-8 text-12 font-400 text-grey-500'>채팅방 목록</h2>
        <ul className='flex flex-col gap-12'>
          {chats.map((chat) => (
            <button
              key={chat.id}
              className='w-full text-left'
              onClick={() => {
                navigate(`project/${chat.projectId}/chat/${chat.id}`);
              }}
            >
              <h3 className='border-b border-grey-300/30 py-4 text-14 font-500 text-grey-700'>
                {chat.title}
              </h3>
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
