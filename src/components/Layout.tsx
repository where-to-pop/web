import { ReactNode } from 'react';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

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
