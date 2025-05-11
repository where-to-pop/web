import { useNavigate } from 'react-router-dom';

const ProjectCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/project/1');
  };

  return (
    <button
      onClick={handleClick}
      className='relative h-300 w-300 overflow-hidden rounded-6'
    >
      <img
        src='/images/project-example.webp'
        alt='project-card'
        className='h-full w-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/45 to-transparent' />
      <h3 className='absolute bottom-8 right-12 line-clamp-1 text-24 font-600 text-white'>
        나이키
      </h3>
    </button>
  );
};

export default ProjectCard;
