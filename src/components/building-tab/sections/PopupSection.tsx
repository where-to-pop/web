import Card from 'src/components/Card';

const PopupSection = () => {
  return (
    <section>
      <h2 className='pb-12 text-14 font-500'>팝업스토어</h2>
      <div className='flex flex-col gap-20'>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            총 <span className='text-primary'>12개</span> 의 팝업스토어를
            진행했습니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='카테고리'>F&B</Card>
            <Card title='유형'>체험형</Card>
            <Card title='브랜드 규모'>중소</Card>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PopupSection;
