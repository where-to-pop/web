import Card from '../Card';
import Divider from '../Divider';
import BrandSection from './sections/BrandSection';
import BuildingSection from './sections/BuildingSection';
import MarketSection from './sections/MarketSection';
import PopupSection from './sections/PopupSection';
import SearchFitnessSection from './sections/SearchFitnessSection';

const BuildingTab = () => {
  return (
    <div className='fixed bottom-0 right-0 top-0 z-floating w-[40dvw] overflow-y-auto bg-white p-24 shadow-[-6px_5px_16px_rgba(0,0,0,0.1)]'>
      <h1 className='mb-12 mt-4 text-24 font-700'>
        서울특별시 성동구 연무장길 38
      </h1>
      {/* AI 한줄평 */}
      <section className='mb-20 rounded-4 border border-grey-400 bg-grey-50 px-12 py-8 text-14 font-400 text-black'>
        F&B 위주의 팝업스토어가 최근 3주 내에 20대 남자들에게 좋은 반응을 보이고
        있습니다.
      </section>
      <div className='flex flex-col gap-20'>
        <SearchFitnessSection />
        <Divider />
        <PopupSection />
        <Divider />
        <BrandSection />
        <Divider />
        <BuildingSection />
        <Divider />
        <MarketSection />
      </div>
    </div>
  );
};

export default BuildingTab;
