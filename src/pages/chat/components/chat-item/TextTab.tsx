interface Props {
  text: string;
}

const TextTab = ({ text }: Props) => {
  return (
    <p className='whitespace-pre-wrap text-14 font-400 leading-[180%]'>
      {text}
    </p>
  );
};

export default TextTab;
