import Article from 'src/components/Article';
import Card from 'src/components/Card';
import CustomPieChart from 'src/components/charts/CustomPieChart';
import Section from 'src/components/Section';

const BrandSection = () => {
  return (
    <Section title='브랜드'>
      <Article
        title={
          <span>
            브랜드 도달 범위는 <span className='text-primary'>높음</span>{' '}
            입니다.
          </span>
        }
      >
        <div className='grid grid-cols-2 gap-12'>
          <Card title='방문객 수' className='col-span-2 h-64 w-full'>
            100,000
          </Card>
          <Card title='성별' className='h-260 w-full'>
            <div className='relative h-224 w-full'>
              <CustomPieChart data={MOCK_GENDER_DATA} dataKey='value' />
            </div>
            <div className='h-36' />
          </Card>
          <Card title='연령대' className='h-260 w-full'>
            <CustomPieChart data={MOCK_AGE_DATA} dataKey='value' />
          </Card>
        </div>
      </Article>
      <Article
        title={
          <span>
            SNS 영향력은 <span className='text-primary'>높음</span> 입니다.
          </span>
        }
      >
        <div className='grid grid-cols-2 gap-12'>
          <Card
            title='팝업스토어 해시태그 사용량'
            className='col-span-2 h-64 w-full'
          >
            100,000
          </Card>
          <Card title='긍정 및 부정 후기' className='h-260 w-full'>
            <CustomPieChart
              data={MOCK_POSITIVE_FEEDBACK_DATA}
              dataKey='value'
            />
          </Card>
          <Card title='피드백' className='h-260 w-full'>
            <ul className='flex w-full list-disc flex-col gap-8 pl-12 text-left text-14 font-500 text-black'>
              <li>공간이 좁아서 아늑했어요!</li>
              <li>사람이 너무 몰려서 돌아다니기 불편했어요</li>
              <li>직원들이 응대를 빠르게 안해줘서 별로였어요</li>
            </ul>
          </Card>
        </div>
      </Article>
    </Section>
  );
};

export default BrandSection;

const MOCK_GENDER_DATA = [
  {
    name: '남자',
    value: 100000,
  },
  {
    name: '여자',
    value: 200000,
  },
];

const MOCK_AGE_DATA = [
  {
    name: '10대',
    value: 10000,
  },
  {
    name: '20대',
    value: 28000,
  },
  {
    name: '30대',
    value: 25000,
  },
  {
    name: '40대',
    value: 20000,
  },
  {
    name: '50대 이상',
    value: 10000,
  },
];

const MOCK_POSITIVE_FEEDBACK_DATA = [
  {
    name: '긍정',
    value: 100000,
  },
  {
    name: '부정',
    value: 200000,
  },
];
