import { IconAddSquare } from 'public/icons';
import ProjectCard from './components/ProjectCard';
import NewProjectModal from './components/NewProjectModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProjects } from 'src/services/project.service';
import { deleteLogout } from 'src/services/auth.service';
import { toast } from 'react-toastify';

const ProjectPage = () => {
  const navigate = useNavigate();

  const { data: projects } = useGetProjects();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await deleteLogout();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('로그아웃에 실패했습니다.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  return (
    <>
      <div className='h-full w-full'>
        <nav className='flex h-48 items-center justify-between border-b border-grey-300 bg-white p-20'>
          <h1 className='text-20 font-600 text-primary-500'>WHERE TO POP</h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className='text-grey-700 underline underline-offset-2 disabled:opacity-50'
          >
            로그아웃
          </button>
        </nav>
        <main className='mx-auto max-w-1236 p-28 pt-36'>
          <div className='mb-24 flex items-center justify-between'>
            <h2 className='text-18 font-500'>현재 진행 중인 프로젝트들</h2>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className='rounded-4 bg-primary-500 px-8 py-4 text-14 font-400 text-white'
            >
              추가하기
            </button>
          </div>
          <ul className='flex flex-wrap gap-12'>
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className='relative flex h-300 w-300 items-center justify-center rounded-6 bg-grey-100'
            >
              <IconAddSquare width={32} height={32} />
            </button> */}
          </ul>
        </main>
      </div>
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        closeModal={() => setIsNewProjectModalOpen(false)}
      />
    </>
  );
};

export default ProjectPage;
