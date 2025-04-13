import { ReactNode } from 'react';
import Divider from './Divider';

interface Props {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: Props) => {
  return (
    <>
      <Divider />
      <section>
        <h2 className='pb-8 text-12 font-500 text-grey-700'>{title}</h2>
        <div className='flex flex-col gap-28'>{children}</div>
      </section>
    </>
  );
};

export default Section;
