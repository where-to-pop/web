import { ChangeEvent, KeyboardEvent } from 'react';
import { IconSearch } from 'public/icons';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange, onSubmit }: Props) => {
  return (
    <div className='flex h-48 w-full items-center overflow-hidden rounded-6 border border-primary/80 bg-white/90 px-8 pr-12 shadow-lg'>
      <IconSearch />
      <input
        className='grow text-16 outline-none'
        placeholder='어떤 팝업스토어를 개최하고 싶나요? '
        value={value}
        onChange={onChange}
        onKeyDown={onSubmit}
      />
    </div>
  );
};

export default SearchInput;
