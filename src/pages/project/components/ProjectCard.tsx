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
      className='relative h-280 w-300 overflow-hidden rounded-4 border border-grey-200 bg-white'
    >
      <h4
        className='absolute left-1/2 top-92 -translate-x-1/2 text-[36px] font-700 text-grey-200'
        style={{
          color: color,
        }}
      >
        {project.brandName}
      </h4>
      <div className='absolute bottom-84 left-1/2 h-[1px] w-260 -translate-x-1/2 bg-grey-200' />
      <div className='absolute bottom-20 left-20 flex flex-col text-left text-black'>
        <h1 className='text-18 font-600'>{project.name}</h1>
        <h1 className='text-12 font-400 text-grey-600'>{formattedDuration}</h1>
      </div>
    </button>
  );
};

export default ProjectCard;
