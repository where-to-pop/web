import Input from './components/Input';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AssistantMessage from './components/message/AssistantMessage';
import UserMessage from './components/message/UserMessage';
import useChat from './hooks/useChat';
import { useEffect } from 'react';
// import { IconWrite } from 'public/icons';

const ChatPage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('isNew') === 'true';

  const removeIsNew = () => {
    searchParams.delete('isNew');
    navigate('.');
  };

  const {
    messagesContainerRef,
    inputRef,
    messages,
    value,
    setValue,
    isLoading,
    handleSubmit,
    handleFetchSSE,
    phase,
    phaseMessage,
  } = useChat({ chatId: chatId ?? '' });

  useEffect(() => {
    if (isNew && messages.length !== 0) {
      handleFetchSSE();
      removeIsNew();
    }
  }, [isNew, messages.length]);

  return (
    <>
      <section
        ref={messagesContainerRef}
        className='relative flex-1 overflow-y-auto pb-140 pt-24 scrollbar-hide'
      >
        <ul className='mx-auto max-w-900 px-16'>
          {messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            return message.role === 'USER' ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                phase={isLastMessage ? phase : null}
                phaseMessage={isLastMessage ? phaseMessage : null}
              />
            );
          })}
        </ul>
      </section>
      <Input
        ref={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
      {/* <div className='group fixed bottom-24 right-24 top-60 h-[50px] w-[50px]'>
        <button className='cursor-pointer rounded-full border border-grey-200 bg-grey-200/50 p-12'>
          <IconWrite width={24} height={24} />
        </button>
        <section className='fixed -right-360 bottom-0 top-48 w-360 overflow-y-auto whitespace-pre-wrap border border-grey-200 bg-white p-24 opacity-0 shadow-sm transition-all duration-200 scrollbar-hide group-hover:right-0 group-hover:opacity-100 '>
          <h3 className='text-grey-800 pb-12 text-16 font-500'>보고서</h3>
          <p className='text-grey-800 whitespace-pre-wrap text-14 font-400 leading-[160%]'>
            {MOCK_REPORT}
          </p>
        </section>
      </div> */}
    </>
  );
};

export default ChatPage;

// const MOCK_REPORT =
//   '당사는 브랜드 인지도 제고 및 신제품 홍보, 소비자와의 접점 강화를 목적으로 2025년 6월 10일부터 6월 16일까지 총 7일간 ○○몰 1층 이벤트존에 팝업스토어를 개설합니다. 이번 팝업스토어는 최근 출시한 신제품을 중심으로 구성되며, 주요 타깃층인 20~30대 고객에게 직접 제품을 체험하고 구매할 수 있는 기회를 제공합니다.\n공간 구성은 브랜드 아이덴티티를 효과적으로 반영할 수 있도록 기획되었으며, 포토존, 체험존, 판매존으로 구분하여 방문 고객이 다양한 방식으로 브랜드를 경험할 수 있도록 설계하였습니다. 또한, 한정판 굿즈 증정 및 SNS 인증 이벤트 등 다양한 프로모션을 병행하여 방문객 유입과 관심을 극대화할 계획입니다.\n현장 운영 인력은 브랜드 교육을 이수한 전문 인력을 배치하여 고객 응대 품질을 높이고, 판매 및 피드백 수집을 체계적으로 진행할 예정입니다. 팝업스토어 운영을 통해 수집된 고객 반응, 제품 만족도, 구매 전환율 등의 데이터를 분석하여 향후 정식 매장 오픈 여부 및 마케팅 전략 수립에 적극 반영할 계획입니다.\n이번 팝업스토어는 단기적인 판매 성과뿐 아니라 브랜드의 장기적인 성장 기반을 마련하기 위한 중요한 기회로, 향후 지속적인 오프라인 접점 확대 전략의 시발점이 될 것입니다.';
