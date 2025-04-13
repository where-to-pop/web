import Article from 'src/components/Article';
import Card from 'src/components/Card';
import Section from 'src/components/Section';

const PopupSection = () => {
  return (
    <Section title='팝업스토어'>
      <Article
        title={
          <span>
            총 <span className='text-primary'>132개</span> 의 팝업스토어를
            진행했습니다.
          </span>
        }
      >
        <div className='flex flex-wrap justify-between gap-12'>
          <Card title='카테고리'>F&B</Card>
          <Card title='유형'>체험형</Card>
          <Card title='브랜드 규모'>중소</Card>
        </div>
      </Article>
    </Section>
  );
};

export default PopupSection;
