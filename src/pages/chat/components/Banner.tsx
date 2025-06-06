interface Props {
  brandName: string;
  handleQuestionClick: (question: string) => void;
}

const Banner = ({ brandName, handleQuestionClick }: Props) => {
  return (
    <>
      <h2 className='absolute left-1/2 top-[35%] -translate-x-1/2 bg-gradient-to-r from-primary-500 to-[#00CCCC] bg-clip-text text-24 font-500 text-transparent'>
        {brandName} 팝업스토어를 어디에 개설할까요?
      </h2>
      <div className='absolute bottom-[20%] left-1/2 flex -translate-x-1/2 flex-col gap-[2px] text-left'>
        {MOCK_QUESTIONS.map((question) => (
          <p
            key={question}
            onClick={() => handleQuestionClick(question)}
            className='cursor-pointer text-14 font-400 text-grey-600 underline underline-offset-2 transition-all duration-150 hover:text-primary-500'
          >
            {question}
          </p>
        ))}
      </div>
    </>
  );
};

export default Banner;

const MOCK_QUESTIONS = [
  '지난주에 어떤 지역이 핫했어?',
  '내가 만들고자하는 팝업스토어와 비슷한 컨셉을 가진 사례를 알려줘',
  '최근 팝업스토어 중 가장 인기있는 컨셉은 뭐야?',
];
