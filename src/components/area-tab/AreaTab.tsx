import AreaSection from './sections/AreaSection';
import PopupSection from './sections/PopupSection';

const AreaTab = () => {
  return (
    <div className='fixed bottom-0 right-0 top-0 z-floating w-[40dvw] overflow-y-auto bg-white p-24 shadow-[-6px_5px_14px_rgba(0,0,0,0.1)]'>
      <h1 className='mb-12 mt-4 text-24 font-700'>성수카페거리</h1>
      <section className='mb-20 rounded-4 border border-grey-400 bg-primary/5 px-12 py-8 text-14 font-500 text-black'>
        최근 팝업스토어 개설 빈도가 32% 증가했습니다.
      </section>
      <div className='flex flex-col gap-20'>
        <PopupSection />
        <AreaSection />
      </div>
    </div>
  );
};

export default AreaTab;
