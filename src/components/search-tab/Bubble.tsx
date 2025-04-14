import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  align: 'left' | 'right';
}

const Bubble = ({ children, align }: Props) => {
  return align === 'left' ? (
    <LeftBubble children={children} />
  ) : (
    <RightBubble children={children} />
  );
};

export default Bubble;

const LeftBubble = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-fit max-w-300 whitespace-pre-wrap break-words rounded-4 bg-grey-200/80 px-12 py-4'>
      {children}
    </div>
  );
};

const RightBubble = ({ children }: PropsWithChildren) => {
  return (
    <div className='ml-auto w-fit max-w-300 whitespace-pre-wrap break-words rounded-4 bg-primary/20 px-12 py-4'>
      {children}
    </div>
  );
};
