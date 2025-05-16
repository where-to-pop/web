import { IconAddSquare } from 'public/icons';
import ProjectCard from './components/ProjectCard';
import NewProjectModal from './components/NewProjectModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProjects } from 'src/services/project.service';
import { usePostLogout } from 'src/services/auth.service';
import { toast } from 'react-toastify';

const ProjectPage = () => {
  const navigate = useNavigate();

  const { data: projects } = useGetProjects();

  const { mutateAsync: postLogout, isPending: isLoggingOut } = usePostLogout();
  const handleLogout = async () => {
    try {
      await postLogout();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('로그아웃에 실패했습니다.');
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
        <main className='p-28 pt-36'>
          <ul className='mx-auto flex max-w-1236 flex-wrap gap-12'>
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className='relative flex h-300 w-300 items-center justify-center rounded-6 bg-grey-100'
            >
              <IconAddSquare width={32} height={32} />
            </button>
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
