// 군구 마커 생성 (랭킹이 1에 가까울 수록 더 크고 진하게 표시)
export const createGunguMarker = (gungu: string, ranking: number) => {
  const MAX_RANK = 10;
  const opacity = 0.9 - (ranking / MAX_RANK) * 0.9;
  const size = (226 * (MAX_RANK - ranking + 1)) / MAX_RANK;
  const textSize = (30 * (MAX_RANK - ranking + 1)) / MAX_RANK;

  const content = document.createElement('div');
  content.className =
    'rounded-full flex justify-center items-center flex-col font-600';
  content.style.backgroundColor = `rgba(99, 72, 250, ${opacity})`;
  content.style.width = `${size}px`;
  content.style.height = `${size}px`;
  content.style.fontSize = `${textSize}px`;

  content.innerHTML = `<p class="text-white">${gungu}</p>`;

  return content;
};

export const createAreaMarker = (area: string) => {
  const content = document.createElement('div');
  content.className =
    'rounded-full flex justify-center items-center flex-col px-20 h-40 bg-primary/80 border-2 border-primary font-400 text-16';

  content.innerHTML = `<p class="text-white">${area}</p>`;

  return content;
};
