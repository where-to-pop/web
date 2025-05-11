import { IconAddSquare, IconLogo } from 'public/icons';
import ProjectCard from './components/ProjectCard';

const ProjectPage = () => {
  return (
    <div className='h-full w-full'>
      <nav className='flex h-48 items-center justify-between border-b border-grey-300 bg-white p-20'>
        <h1 className='text-primary-500 text-20 font-600'>WHERE TO POP</h1>
        <button className='text-grey-700 underline underline-offset-2'>
          로그아웃
        </button>
      </nav>
      <main className='p-28 pt-36'>
        <ul className='mx-auto flex max-w-1236 flex-wrap gap-12'>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <button className='relative flex h-300 w-300 items-center justify-center rounded-6 bg-grey-100'>
            <IconAddSquare width={32} height={32} />
          </button>
        </ul>
      </main>
    </div>
  );
};

export default ProjectPage;
