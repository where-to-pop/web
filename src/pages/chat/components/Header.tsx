import { useGetProject } from 'src/services/project.service';

interface Props {
  projectId: number;
}

const Header = ({ projectId }: Props) => {
  const { data: project } = useGetProject(projectId);
  const projectName = project?.name ?? '';

  return (
    <header className='flex h-48 w-full shrink-0 items-baseline gap-16 border-b border-grey-200 px-24 py-12'>
      <h1 className='text-18 font-600 text-primary-500'>WHERE TO POP</h1>
      <h2 className='text-14 font-500 text-primary-500/80'>{projectName}</h2>
    </header>
  );
};

export default Header;
