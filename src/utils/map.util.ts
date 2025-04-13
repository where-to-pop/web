import { CATEGORIES_WITH_INFO, Category } from 'constants/category.const';

// 군구 마커 생성 (랭킹이 1에 가까울 수록 더 크고 진하게 표시)
export const createGunguMarker = (name: string, ranking: number) => {
  const MAX_RANK = 10;
  const opacity = 0.9 - (ranking / MAX_RANK) * 0.6;
  const size = (208 * (MAX_RANK - ranking + 1)) / MAX_RANK;
  const textSize = (30 * (MAX_RANK - ranking + 1)) / MAX_RANK;

  const content = document.createElement('div');
  content.className =
    'rounded-full flex justify-center items-center flex-col font-600';
  content.style.backgroundColor = `rgba(99, 72, 250, ${opacity})`;
  content.style.width = `${size}px`;
  content.style.height = `${size}px`;
  content.style.fontSize = `${textSize}px`;

  content.innerHTML = `<p class="text-white">${name}</p>`;

  return content;
};

// 지역 마커 생성
export const createAreaMarker = (name: string) => {
  const content = document.createElement('div');
  content.className =
    'rounded-full flex justify-center items-center flex-col px-20 h-36 bg-primary/80 border-2 border-primary font-500 text-14';

  content.innerHTML = `<p class="text-white">${name}</p>`;

  return content;
};

// 건물 마커 생성
export const createBuildingMarker = (category: Category) => {
  const content = document.createElement('div');
  content.className =
    'rounded-full flex justify-center items-center flex-col bg-primary w-[30px] h-[30px]';

  const iconSrc = CATEGORIES_WITH_INFO[category].iconSrc;
  content.innerHTML = `<img width="18" height="18" src=${iconSrc} alt=${category} />`;

  return content;
};
