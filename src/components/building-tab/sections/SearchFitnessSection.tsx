import Card from 'src/components/Card';

const SearchFitnessSection = () => {
  return (
    <section>
      <h2 className='pb-12 text-20 font-600'>검색 일치도</h2>
      <div className='flex flex-wrap justify-between gap-12'>
        <Card title='브랜드 적합도'>90%</Card>
        <Card title='빌딩 적합도'>높음</Card>
        <Card title='상권 특성 일치도'>34%</Card>
      </div>
    </section>
  );
};

export default SearchFitnessSection;
