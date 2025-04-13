import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, children, className }: Props) => {
  return (
    <div
      className={customTwMerge(
        'relative flex h-152 w-152 items-center justify-center rounded-6 border border-grey-300 bg-white p-12 pt-24',
        className,
      )}
    >
      <h4 className='absolute left-12 top-8 break-keep text-14 font-500 text-grey-700'>
        {title}
      </h4>
      <p className='text-20 font-600 text-primary'>{children}</p>
    </div>
  );
};

export default Card;
