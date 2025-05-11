import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  title: ReactNode;
  subTitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, subTitle, children, className }: Props) => {
  return (
    <div
      className={customTwMerge(
        'text-primary-500 relative flex h-152 w-152 flex-col items-center justify-center rounded-6 border border-grey-300 bg-white p-12 pt-24 text-20 font-600',
        className,
      )}
    >
      <h4 className='absolute left-12 top-8 break-keep text-14 font-500 text-grey-700'>
        {title}
      </h4>
      {subTitle && (
        <p className='absolute bottom-8 right-8 break-keep text-12 font-400 text-grey-500'>
          {subTitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default Card;
