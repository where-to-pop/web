import { IconArrowUp } from 'public/icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const Input = ({ value, onChange, onSubmit }: Props) => {
  return (
    <section className='absolute bottom-0 left-1/2 h-120 w-full max-w-900 -translate-x-1/2 rounded-t-16 bg-[#F8F9FA] pb-24'>
      <textarea
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
        placeholder='요새 SNS에서 반응이 좋은 곳들을 추천해줘.'
        className='focus:border-primary-500 h-full w-full resize-none rounded-16 border-[1.3px] border-grey-300 bg-transparent px-16 py-12 text-16 font-400 outline-none'
      />
      <button
        onClick={onSubmit}
        className='absolute bottom-32 right-8 flex h-32 w-32 items-center justify-center rounded-full bg-grey-200'
      >
        <IconArrowUp width={20} height={20} />
      </button>
    </section>
  );
};

export default Input;
