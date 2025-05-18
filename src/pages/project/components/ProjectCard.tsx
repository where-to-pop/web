import dayjs from 'dayjs';
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

  const formattedDuration = project.duration
    .split(' ~ ')
    .map((date) => dayjs(date).format('YYYY.MM.DD'))
    .join(' ~ ');

  return (
    <button
      onClick={handleClick}
      className='relative h-300 w-300 overflow-hidden rounded-6'
      style={{ backgroundColor: color }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-black/45 to-transparent' />
      <div className='absolute bottom-12 right-16 flex flex-col text-right text-white'>
        <h4 className='pb-[2px] text-12 font-400'>{project.brandName}</h4>
        <h1 className='pb-4 text-24 font-600'>{project.name}</h1>
        <h1 className='text-12 font-400'>{formattedDuration}</h1>
      </div>
    </button>
  );
};

export default ProjectCard;
