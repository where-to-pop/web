import Card from 'src/components/Card';

const MarketSection = () => {
  return (
    <section>
      <h2 className='pb-12 text-14 font-500'>상권</h2>
      <div className='flex flex-col gap-20'>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            상권 안정성은 <span className='text-primary'>낮음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='평균 임대료'>100,000</Card>
            <Card title='평균 공실률'>100,000</Card>
          </div>
        </article>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            상권 성장성은 <span className='text-primary'>낮음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='신규 오픈 매장 수'>100,000</Card>
            <Card title='상권 폐업 매장 수'>100,000</Card>
          </div>
        </article>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            지역 인기도 및 인지도는 <span className='text-primary'>낮음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='지역 SNS 언급량'>100,000</Card>
            <Card title='긍정 및 부정 언급 비율'>100,000</Card>
          </div>
        </article>
      </div>
    </section>
  );
};

export default MarketSection;
