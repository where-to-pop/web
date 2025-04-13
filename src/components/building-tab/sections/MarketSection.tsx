import Article from 'src/components/Article';
import Card from 'src/components/Card';
import CustomPieChart from 'src/components/charts/CustomPieChart';
import Section from 'src/components/Section';

const MarketSection = () => {
  return (
    <Section title='상권'>
      <Article
        title={
          <span>
            상권 안정성은 <span className='text-primary'>낮음</span> 입니다.
          </span>
        }
      >
        <div className='grid grid-cols-3 gap-12'>
          <Card title='평균 임대료' subTitle='(원)'>
            12,000,000
          </Card>
          <Card title='평균 공실률'>8%</Card>
        </div>
      </Article>
      <Article
        title={
          <span>
            상권 성장성은 <span className='text-primary'>낮음</span> 입니다.
          </span>
        }
      >
        <div className='grid grid-cols-3 gap-12'>
          <Card title='신규 오픈 매장 수'>100,000</Card>
          <Card title='상권 폐업 매장 수'>100,000</Card>
        </div>
      </Article>
      <Article
        title={
          <span>
            지역 인기도 및 인지도는 <span className='text-primary'>낮음</span>{' '}
            입니다.
          </span>
        }
      >
        <div className='flex flex-col gap-12'>
          <Card title='지역 SNS 언급량' className='h-64 w-full'>
            100,000
          </Card>
          <Card title='긍정 및 부정 언급 비율' className='h-260 w-full'>
            <CustomPieChart data={MOCK_MENTION_DATA} dataKey='value' />
          </Card>
        </div>
      </Article>
    </Section>
  );
};

export default MarketSection;

const MOCK_MENTION_DATA = [
  {
    name: '긍정',
    value: 100000,
  },
  {
    name: '부정',
    value: 200000,
  },
];
