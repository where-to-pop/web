import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Chat from './Chat';
import SearchInput from './SearchInput';

export interface Message {
  id: number;
  content: string;
  align: 'left' | 'right';
}

const DEFAULT_RESPONSE_MESSAGE = {
  content: '다음 건물들을 추천드려요!',
  align: 'left',
} as const;

const SearchTab = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

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
