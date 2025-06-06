import { IconArrowUp } from 'public/icons';
import { forwardRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const Input = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange, onSubmit, disabled }, ref) => {
    return (
      <section className='absolute bottom-0 left-1/2 flex h-104 w-full max-w-900 -translate-x-1/2 flex-col rounded-t-16'>
        <div className='h-16 w-full bg-gradient-to-t from-[#F5F5F7] to-transparent' />
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
          disabled={disabled}
          placeholder='요새 SNS에서 반응이 좋은 곳들을 추천해줘.'
          className='grow resize-none rounded-16 border-[1.3px] border-grey-300 bg-transparent bg-white px-16 py-12 text-16 font-400 outline-none focus:border-primary-500 disabled:text-grey-700'
        />
        <button
          onClick={onSubmit}
          disabled={disabled}
          className='absolute bottom-[18px] right-[6px] flex h-32 w-32 items-center justify-center rounded-full bg-grey-200 disabled:opacity-50'
        >
          <IconArrowUp width={20} height={20} />
        </button>
        <div className='h-12 w-full bg-[#F5F5F7]' />
      </section>
    );
  },
);

export default Input;
