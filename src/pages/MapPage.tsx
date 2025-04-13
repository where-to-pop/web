import { CATEGORIES } from 'src/constants/category.const';
import {
  ZOOM_LEVEL_LIMIT,
  BUILDING_CLUSTER_STYLES,
} from 'src/constants/map.const';
import { AREA_COORDS, AREAS, GUNGU_COORDS } from 'src/constants/regions.const';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createAreaMarker,
  createBuildingMarker,
  createGunguMarker,
} from 'src/utils/map.util';
import AreaTab from 'src/components/area-tab/AreaTab';
import BuildingTab from 'src/components/building-tab/BuildingTab';

const Map = () => {
  const isInitialized = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useRef<kakao.maps.Map | null>(null);
  const gunguMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const areaMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const buildingMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const buildingClusterer = useRef<kakao.maps.MarkerClusterer | null>(null);
  const selectedMarker = useRef<kakao.maps.Marker | null>(null);

  // NOTE: 이벤트 리스너 내에서 변수 값을 읽기 위해 ref와 state를 둘 다 사용
  const selectedAreaRef = useRef<(typeof AREAS)[number] | null>(null);
  const [selectedArea, setSelectedArea] = useState<
    (typeof AREAS)[number] | null
  >(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const initializeMap = useCallback(async () => {
    if (window.kakao && mapRef.current) {
      const options = {
        center: new kakao.maps.LatLng(37.545, 126.99),
        level: ZOOM_LEVEL_LIMIT.gungu,
      };

      const newMap = new kakao.maps.Map(mapRef.current, options);
      map.current = newMap;

      initializeGunguMarkers(newMap);
      initializeAreaMarkers(newMap);
      initializeBuildingMarkers(newMap);

      kakao.maps.event.addListener(newMap, 'zoom_changed', () => {
        const zoomLevel = newMap.getLevel();
        handleZoomChanged(zoomLevel);
      });
    }
  }, []);

  const initializeGunguMarkers = useCallback((map: kakao.maps.Map) => {
    const gunguWithCoords = Object.entries(GUNGU_COORDS)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

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
      gunguMarkers.current.push(customOverlay);
    });
  }, []);

  const initializeAreaMarkers = useCallback((map: kakao.maps.Map) => {
    const areaWithCoords = Object.entries(AREA_COORDS);
    areaWithCoords.forEach(([area, coordinates]) => {
      const position = new kakao.maps.LatLng(
        coordinates.latitude,
        coordinates.longitude,
      );
      const areaMarker = createAreaMarker(area);
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: areaMarker,
        clickable: true,
      });

      areaMarker.addEventListener('click', () => {
        // 같은 지역을 두번 클릭 시 줌인
        if (area === selectedAreaRef.current) {
          // @ts-expect-error 카카오 지도 타입 패키지 미업데이트로 인한 오류
          map.jump(position, ZOOM_LEVEL_LIMIT.building, {
            animate: true,
          });
          return;
        }

        // 지역 탭 표시
        selectedAreaRef.current = area;
        setSelectedArea(area);
        const zoomLevel = map.getLevel();
        let offset = zoomLevel === ZOOM_LEVEL_LIMIT.area ? 0.02 : 0.01;
        const shiftedPosition = new kakao.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude + offset,
        );
        map.panTo(shiftedPosition);
      });

      customOverlay.setMap(map);
      customOverlay.setVisible(false);
      areaMarkers.current.push(customOverlay);
    });
  }, []);

  const initializeBuildingMarkers = useCallback((map: kakao.maps.Map) => {
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

    buildingClusterer.current = clusterer;

    // 클릭 시 생성되는 마커
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.545, 126.99),
      zIndex: 100,
    });
    marker.setMap(map);
    marker.setVisible(false);
    selectedMarker.current = marker;

    // 빌딩 핀
    MOCK_BUILDING_COORDS.forEach(([latitude, longitude, name]) => {
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
      customOverlay.setVisible(false);
      buildingMarkers.current.push(customOverlay);

      clusterer.addMarker(customOverlay);

      buildingMarker.addEventListener('click', () => {
        setSelectedBuilding(name);
        marker.setPosition(position);
        marker.setVisible(true);
      });
    });
  }, []);

  const handleZoomChanged = useCallback((zoomLevel: number) => {
    if (zoomLevel > ZOOM_LEVEL_LIMIT.area) {
      selectedAreaRef.current = null;
      setSelectedArea(null);
      setSelectedBuilding(null);
      selectedMarker.current?.setVisible(false);
      gunguMarkers.current.forEach((marker) => {
        marker.setVisible(true);
      });
      areaMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      buildingMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      buildingClusterer.current?.setMap(null);
    } else if (zoomLevel > ZOOM_LEVEL_LIMIT.building) {
      setSelectedBuilding(null);
      selectedMarker.current?.setVisible(false);
      gunguMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      areaMarkers.current.forEach((marker) => {
        marker.setVisible(true);
      });
      buildingMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      buildingClusterer.current?.setMap(null);
    } else {
      selectedAreaRef.current = null;
      setSelectedArea(null);
      gunguMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      areaMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      buildingMarkers.current.forEach((marker) => {
        marker.setVisible(true);
      });
      buildingClusterer.current?.setMap(map.current);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initializeMap();
    }
  }, []);

  return (
    <main className='relative h-screen w-screen'>
      <div ref={mapRef} className='h-full w-full' />
      {selectedArea && <AreaTab area={selectedArea} />}
      {selectedBuilding && <BuildingTab address={selectedBuilding} />}
    </main>
  );
};

export default Map;

const MOCK_BUILDING_COORDS: [number, number, string][] = [
  [37.54343390490632, 127.05174586952529, '서울특별시 성동구 연무장길 38'],
  [37.54323537558675, 127.0524472925928, '서울특별시 성동구 연무장길 37'],
  [37.54311807419734, 127.05283193642344, '서울특별시 성동구 연무장길 36'],
  [37.5434696805452, 127.05234561701565, '서울특별시 성동구 연무장길 35'],
  [37.54405479726204, 127.05353416540369, '서울특별시 성동구 연무장길 34'],
  [37.54402043881545, 127.04968683441979, '서울특별시 성동구 연무장길 33'],
  [37.54259725624128, 127.04873539698823, '서울특별시 성동구 연무장길 32'],
  [37.543063646933355, 127.05364661131054, '서울특별시 성동구 연무장길 31'],
  [37.54262139526008, 127.05529834216931, '서울특별시 성동구 연무장길 30'],
  [37.54250447645044, 127.05484564070186, '서울특별시 성동구 연무장길 29'],
  [37.54138688278711, 127.0556029410406, '서울특별시 성동구 연무장길 28'],
  [37.54127928500763, 127.05448265706279, '서울특별시 성동구 연무장길 27'],
  [37.541549730574054, 127.0541660273163, '서울특별시 성동구 연무장길 26'],
  [37.54071122894428, 127.05539876737014, '서울특별시 성동구 연무장길 25'],
  [37.54372912125293, 127.05636282325551, '서울특별시 성동구 연무장길 24'],
];
