import ReactMarkdown from 'react-markdown';

interface Props {
  text: string;
}

const TextTab = ({ text }: Props) => {
  return (
    <p className='whitespace-pre-wrap text-14 font-400 leading-[140%]'>
      <ReactMarkdown>{text}</ReactMarkdown>
    </p>
  );
};

export default TextTab;
