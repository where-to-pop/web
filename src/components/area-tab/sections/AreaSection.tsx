import Article from 'src/components/Article';
import Card from 'src/components/Card';
import CustomLineChart from 'src/components/charts/CustomLineChart';
import CustomPieChart from 'src/components/charts/CustomPieChart';
import Section from 'src/components/Section';

const AreaSection = () => {
  return (
    <Section title='지역 지표'>
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
        <Card title='상주 인구 밀도' className='col-span-2 h-64 w-full'>
          높음
        </Card>
        <Card title='유동 인구' className='col-span-2 h-260 w-full'>
          <CustomLineChart
            data={MOCK_POPULATION_DATA}
            dataKeyX='time'
            dataKeyY={['value']}
            label={{
              value: '유동 인구',
            }}
          />
        </Card>
      </div>
    </Section>
  );
};

export default AreaSection;

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

const MOCK_POPULATION_DATA = [
  {
    time: '10:00',
    value: 100000,
  },
  {
    time: '11:00',
    value: 200000,
  },
  {
    time: '12:00',
    value: 100000,
  },
  {
    time: '13:00',
    value: 250000,
  },
  {
    time: '14:00',
    value: 200000,
  },
  {
    time: '15:00',
    value: 130000,
  },
  {
    time: '16:00',
    value: 150000,
  },
  {
    time: '17:00',
    value: 100000,
  },
];
