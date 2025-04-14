import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import Chat from './Chat';
import SearchInput from './SearchInput';
import { Message } from 'src/types/common';

const DEFAULT_RESPONSE_MESSAGE = {
  content: '다음 건물들을 추천드려요!',
  align: 'left',
} as const;

interface Props {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  handleSetSearchMarkers: () => void;
}

const SearchTab = ({
  messages,
  setMessages,
  handleSetSearchMarkers,
}: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    const newMessage: Message = {
      id: messages.length + 1,
      content: value,
      align: 'right',
    };
    const newResponseMessage: Message = {
      id: messages.length + 2,
      content: DEFAULT_RESPONSE_MESSAGE.content,
      align: DEFAULT_RESPONSE_MESSAGE.align,
    };
    setMessages((prev) => [...prev, newMessage, newResponseMessage]);
    setValue('');
    handleSetSearchMarkers();
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setValue(e.target.value);
    }
  };

  return (
    <div className='fixed bottom-24 left-24 z-nav flex w-400 flex-col items-center gap-16'>
      <Chat messages={messages} />
      <SearchInput
        value={value}
        onChange={handleSearchInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SearchTab;
