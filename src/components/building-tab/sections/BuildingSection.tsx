import Article from 'src/components/Article';
import Card from 'src/components/Card';
import Section from 'src/components/Section';

const BuildingSection = () => {
  return (
    <Section title='건물'>
      <Article
        title={
          <span>
            건물 편의성은 <span className='text-primary'>높음</span> 입니다.
          </span>
        }
      >
        <div className='grid grid-cols-3 gap-12'>
          <Card
            title='연면적'
            subTitle={
              <span>
                (m<sup>2</sup>)
              </span>
            }
          >
            100,000
          </Card>
          <Card title='엘레베이터 유무'>有</Card>
        </div>
      </Article>
    </Section>
  );
};

export default BuildingSection;
