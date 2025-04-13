import Card from 'src/components/Card';

const BrandSection = () => {
  return (
    <section>
      <h2 className='pb-12 text-14 font-500'>브랜드</h2>
      <div className='flex flex-col gap-20'>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            브랜드 도달 범위는 <span className='text-primary'>높음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='방문객 수'>100,000</Card>
            <Card title='성별'>100,000</Card>
            <Card title='연령대'>100,000</Card>
          </div>
        </article>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            SNS 영향력은 <span className='text-primary'>높음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='팝업스토어 해시태그 사용량'>100,000</Card>
            <Card title='긍정 및 부정 후기'>100,000</Card>
            <Card title='피드백'>100,000</Card>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BrandSection;
