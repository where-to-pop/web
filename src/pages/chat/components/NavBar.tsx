import { IconAdd } from 'public/icons';
import { IconHamburger } from 'public/icons';

const NavBar = () => {
  return (
    <nav className='flex h-full w-72 flex-col items-center gap-24 bg-grey-200 py-12'>
      <IconHamburger width={40} height={30} />
      <button className='h-40 w-40 rounded-full bg-grey-300/50'>
        <IconAdd width={40} height={30} />
      </button>
    </nav>
  );
};

export default NavBar;
