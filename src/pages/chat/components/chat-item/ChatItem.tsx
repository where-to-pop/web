import { useState } from 'react';
import Tabs from 'src/components/Tabs';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import { Chat } from '../../ChatPage';

type ChatTab = 'text' | 'chart';

interface Props {
  chat: Chat;
}

const ChatItem = ({ chat }: Props) => {
  const [selected, setSelected] = useState<ChatTab>('text');

  return (
    <article className='flex flex-col gap-8 border-b border-grey-200 pb-24'>
      <h4 className='text-20 font-600'>{chat.question}</h4>
      <div className='w-300'>
        <Tabs
          items={[
            { label: '답변', value: 'text' },
            { label: '차트', value: 'chart' },
          ]}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
      <div className='py-8'>
        {selected === 'text' ? (
          <TextTab text={MOCK_CHAT.answer} />
        ) : (
          <ChartTab />
        )}
      </div>
    </article>
  );
};

export default ChatItem;

const MOCK_CHAT = {
  id: 1,
  question: '20대 남자들에게 반응이 좋을 만한 곳을 알려줘',
  answer:
    "최근 6개월간 20대 남성 사용자들의 위치 기반 데이터와 관심 키워드를 분석한 결과, 홍대입구역, 건대입구역, 성수동이 주요 추천 지역으로 도출되었습니다. 이 지역들은 유동인구가 많고, SNS에서 '재미', '이색', '스트릿', '게임' 등의 키워드와 함께 자주 언급되어 반응도가 높았습니다. 특히 홍대입구는 스트릿 패션과 아트토이 팝업, 레트로 콘셉트의 공간에 대한 관심이 뚜렷하게 나타났고, 건대는 푸드 트럭과 게임 체험형 부스가 포함된 팝업이 인기가 많았습니다.\n또한, 성수동은 최근 힙한 브랜드와 협업한 팝업이 다수 열리면서 감각적인 공간 구성과 사진 촬영 요소가 많은 점에서 20대 남성들의 호응을 얻고 있습니다. 특히 성수연방 인근의 팝업은 '체험+굿즈'를 결합한 형태로 높은 만족도를 기록했어요. 데이터를 기반으로 보면, 주말 기준 방문 의향 비율이 평균 대비 1.8배 이상 높게 나타났습니다.\n이 외에도 트렌드 기반 키워드를 중심으로 타겟팅해보면, ‘게임’, ‘스니커즈’, ‘애니메이션’, ‘레트로’와 같은 요소를 포함한 테마의 팝업이 주목받고 있어요. 따라서 이런 관심사를 반영한 콘텐츠를 기획하거나, 이미 그런 테마가 인기 있는 지역(예: 합정, 압구정 로데오)으로 확장해보는 것도 좋은 전략이 될 수 있습니다. 사용자 반응 예측 AI 모델 기준으로는, 위 지역들에서 팝업을 운영할 경우 20대 남성 대상 참여율이 평균 대비 2.3배 이상 상승할 가능성이 있는 것으로 분석됩니다.",
  createdAt: '2021-01-01',
};
