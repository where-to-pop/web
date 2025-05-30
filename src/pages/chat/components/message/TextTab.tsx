import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  text: string;
}

const TextTab = ({ text }: Props) => {
  return (
    <p className='px-12 text-14 font-400 leading-[140%]'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '400',
                margin: '16px 0 8px',
              }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                marginBottom: '12px',
                lineHeight: '1.5',
                fontSize: '16px',
              }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{
                listStyleType: 'decimal',
                paddingLeft: '20px',
                marginBottom: '12px',
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '12px',
                marginTop: '6px',
                marginBottom: '16px',
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: '4px',
                lineHeight: '1.4',
                fontSize: '14px',
              }}
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong style={{ fontWeight: 600 }} {...props} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </p>
  );
};

export default TextTab;
