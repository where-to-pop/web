import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  text: string;
}

const TextTab = ({ text }: Props) => {
  return (
    <div className='px-12 text-16 font-400 leading-[140%] text-black'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '600',
                margin: '20px 0 12px',
              }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '500',
                margin: '20px 0 12px',
              }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '500',
                margin: '20px 0 12px',
              }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                marginBottom: '20px',
                lineHeight: '1.5',
              }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{
                listStyleType: 'decimal',
                paddingLeft: '32px',
                marginTop: '12px',
                marginBottom: '24px',
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '32px',
                marginTop: '12px',
                marginBottom: '24px',
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: '4px',
                lineHeight: '1.4',
              }}
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong style={{ fontWeight: 500 }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              style={{
                color: '#0066CC',
                textDecoration: 'underline',
                fontWeight: '400',
              }}
              {...props}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default TextTab;
