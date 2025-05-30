import BrandSection from './sections/BrandSection';
import BuildingSection from './sections/BuildingSection';
import MarketSection from './sections/MarketSection';
import PopupSection from './sections/PopupSection';
import SearchFitnessSection from './sections/SearchFitnessSection';

interface Props {
  address: string;
}

const BuildingTab = ({ address }: Props) => {
  return (
    <div className='fixed bottom-0 right-0 top-0 z-floating w-[40dvw] overflow-y-auto bg-white p-24 shadow-[-6px_5px_14px_rgba(0,0,0,0.1)]'>
      <h1 className='mb-12 mt-4 text-24 font-700'>{address}</h1>
      <section className='mb-20 rounded-4 border border-grey-400 bg-primary/5 px-12 py-8 text-14 font-500 text-black'>
        F&B 위주의 팝업스토어가 최근 3주 내에 20대 남자들에게 좋은 반응을 보이고
        있습니다.
      </section>
      <div className='flex flex-col gap-20'>
        <SearchFitnessSection />
        <PopupSection />
        <BrandSection />
        <BuildingSection />
        <MarketSection />
      </div>
    </div>
  );
};

export default BuildingTab;
