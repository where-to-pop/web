import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='relative h-[100dvh] w-[100dvw] bg-[#F8F9FA]'>
      {children}
    </div>
  );
};

export default Layout;
