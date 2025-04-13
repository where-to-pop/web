import { IconSearch } from 'src/assets/icons';

const SearchInput = () => {
  return (
    <div className='fixed bottom-24 left-24 z-nav flex h-48 w-400 items-center overflow-hidden rounded-6 border border-primary/80 bg-white/80 px-8 pr-12'>
      <IconSearch />
      <input
        className='grow text-16 outline-none'
        placeholder='어떤 팝업스토어를 개최하고 싶나요? '
      />
    </div>
  );
};

export default SearchInput;
