import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  text: string;
}

const TextTab = ({ text }: Props) => {
  return (
    <p className='whitespace-pre-wrap text-14 font-400 leading-[140%]'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({ node, ...props }) => (
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '20px',
              }}
              {...props}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
      {/* {text} */}
    </p>
  );
};

export default TextTab;
