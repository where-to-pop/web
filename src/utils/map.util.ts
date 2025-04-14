import {
  CATEGORIES,
  CATEGORIES_WITH_INFO,
  Category,
} from 'src/constants/category.const';
import {
  BUILDING_CLUSTER_STYLES,
  ZOOM_LEVEL_LIMIT,
} from 'src/constants/map.const';

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

export const createNotificationBubble = () => {
  const content = document.createElement('div');
  content.className =
    'flex items-center gap-[2px] whitespace-nowrap break-keep rounded-full bg-red/70 px-8 py-[6px] text-12 font-600 text-white mb-[30px]';

  const notificationIcon = document.createElement('div');
  notificationIcon.className = 'w-16 h-12';
  notificationIcon.innerHTML = `<img src='/icons/notification.svg' />`;
  content.appendChild(notificationIcon);

  const text = document.createElement('div');
  text.textContent = '한번 더 클릭하여 확대해보세요!';
  content.appendChild(text);

  const triangleIcon = document.createElement('div');
  triangleIcon.className =
    'w-24 h-12 absolute top-[18px] left-1/2 -translate-x-1/2 translate-y-full';
  triangleIcon.innerHTML = `<img src='/icons/triangle.svg' />`;
  content.appendChild(triangleIcon);

  return content;
};

// 군구 핀 set
export const setGunguMarkers = ({
  map,
  gunguWithCoords,
}: {
  map: kakao.maps.Map;
  gunguWithCoords: [string, { latitude: number; longitude: number }][];
}) => {
  const gunguMarkers: kakao.maps.CustomOverlay[] = [];
  gunguWithCoords.forEach(([gungu, coordinates], index) => {
    const position = new kakao.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude,
    );
    const gunguMarker = createGunguMarker(gungu, index + 1);
    const customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: gunguMarker,
      clickable: true,
    });

    gunguMarker.addEventListener('click', () => {
      // @ts-expect-error 카카오 지도 타입 패키지 미업데이트로 인한 오류
      map.jump(position, ZOOM_LEVEL_LIMIT.area, { animate: true });
    });

    customOverlay.setMap(map);
    gunguMarkers.push(customOverlay);
  });

  return gunguMarkers;
};

// 빌딩 핀 set
export const setBuildingMarkers = ({
  map,
  buildings,
  setSelectedBuilding,
  defaultVisible = false,
}: {
  map: kakao.maps.Map;
  buildings: [number, number, string][];
  setSelectedBuilding: (building: string) => void;
  defaultVisible?: boolean;
}) => {
  // 클러스터
  const clusterer = new kakao.maps.MarkerClusterer({
    averageCenter: true,
    minLevel: 3,
    disableClickZoom: true,
  });
  clusterer.setStyles(BUILDING_CLUSTER_STYLES);
  clusterer.setCalculator([5, 10, 15]);

  kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: any) => {
    const position = cluster.getCenter();
    const level = map.getLevel() - 1;
    // @ts-expect-error 카카오 지도 타입 패키지 미업데이트로 인한 오류
    map.jump(position, level, {
      animate: true,
    });
  });

  // 클릭 시 생성되는 마커
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.545, 126.99),
    zIndex: 100,
  });
  marker.setMap(map);
  marker.setVisible(false);

  // 빌딩 핀
  const buildingMarkers: kakao.maps.CustomOverlay[] = [];
  buildings.forEach(([latitude, longitude, name]) => {
    const randomCategory =
      CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    const position = new kakao.maps.LatLng(latitude, longitude);
    const buildingMarker = createBuildingMarker(randomCategory);
    const customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: buildingMarker,
      clickable: true,
    });
    customOverlay.setMap(map);
    customOverlay.setVisible(defaultVisible);
    buildingMarkers.push(customOverlay);

    clusterer.addMarker(customOverlay);

    buildingMarker.addEventListener('click', () => {
      setSelectedBuilding(name);
      marker.setPosition(position);
      marker.setVisible(true);
    });
  });

  return {
    buildingClusterer: clusterer,
    selectedMarker: marker,
    buildingMarkers,
  };
};
