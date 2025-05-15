import { useState } from 'react';
import Tabs from 'src/components/Tabs';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import { Message } from 'src/types/chat.type';

interface Props {
  message: Message;
}

const UserMessage = ({ message }: Props) => {
  return <h4 className='pb-8 text-20 font-600'>{message.content}</h4>;
};

export default UserMessage;
