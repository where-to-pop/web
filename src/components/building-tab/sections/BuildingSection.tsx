import Card from 'src/components/Card';

const BuildingSection = () => {
  return (
    <section>
      <h2 className='pb-12 text-14 font-500'>건물</h2>
      <div className='flex flex-col gap-20'>
        <article>
          <h3 className='pb-12 text-20 font-600'>
            건물 편의성은 <span className='text-primary'>높음</span>
            입니다.
          </h3>
          <div className='flex flex-wrap justify-between gap-12'>
            <Card title='연면적'>100,000</Card>
            <Card title='엘레베이터 유무'>100,000</Card>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BuildingSection;
