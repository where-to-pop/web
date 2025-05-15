import { useNavigate } from 'react-router-dom';
import { Project } from 'src/types/project.type';
import { generateRandomColor } from 'src/utils/generateRandomColor';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  const color = generateRandomColor(project.brandName);

  return (
    <button
      onClick={handleClick}
      className='relative h-300 w-300 overflow-hidden rounded-6'
      style={{ backgroundColor: color }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-black/45 to-transparent' />
      <h3 className='absolute bottom-8 right-12 line-clamp-1 text-24 font-600 text-white'>
        {project.brandName}
      </h3>
    </button>
  );
};

export default ProjectCard;
