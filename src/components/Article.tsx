import { ReactNode } from 'react';

interface Props {
  title?: ReactNode;
  children: ReactNode;
}

const Article = ({ title, children }: Props) => {
  return (
    <article>
      <h3 className='pb-12 text-20 font-600'>{title}</h3>
      {children}
    </article>
  );
};

export default Article;
