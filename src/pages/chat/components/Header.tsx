import { useNavigate } from 'react-router-dom';
import { Project } from 'src/types/project.type';

interface Props {
  project: Project | undefined;
}

const Header = ({ project }: Props) => {
  const navigate = useNavigate();
  return (
    <header className='flex h-48 w-full shrink-0 items-baseline gap-16 border-b border-grey-200 px-24 py-12'>
      <h1 className='text-18 font-600 text-primary-500'>
        <button
          type='button'
          onClick={() => {
            navigate('/project');
          }}
        >
          WHERE TO POP
        </button>
      </h1>
      <h2 className='text-14 font-500 text-primary-500/80'>
        {project?.name ?? ''}
      </h2>
    </header>
  );
};

export default Header;
