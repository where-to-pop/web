import { ReactNode } from 'react';
import { IconLogo } from 'src/assets/icons';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='relative h-screen w-screen'>
      <header className='fixed left-12 top-12 z-floating flex items-center gap-4 rounded-6 border border-primary/50 px-4 pr-12 shadow-lg backdrop-blur-sm'>
        <IconLogo />
        <h1 className='text-18 font-700'>WHERE TO POP</h1>
      </header>
      {children}
    </div>
  );
};

export default Layout;
