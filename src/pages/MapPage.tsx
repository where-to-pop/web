import Tab from 'src/components/building-tab/BuildingTab';
import { CATEGORIES } from 'src/constants/category.const';
import {
  ZOOM_LEVEL_LIMIT,
  BUILDING_CLUSTER_STYLES,
} from 'src/constants/map.const';
import { AREA_COORDS, GUNGU_COORDS } from 'src/constants/regions.const';
import { useCallback, useEffect, useRef } from 'react';
import {
  createAreaMarker,
  createBuildingMarker,
  createGunguMarker,
} from 'src/utils/map.util';

const Map = () => {
  const isInitialized = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useRef<kakao.maps.Map | null>(null);
  const gunguMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const areaMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const buildingMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const buildingClusterer = useRef<kakao.maps.MarkerClusterer | null>(null);

  const initializeMap = useCallback(async () => {
    if (window.kakao && mapRef.current) {
      const options = {
        center: new kakao.maps.LatLng(37.545, 126.99),
        level: ZOOM_LEVEL_LIMIT.gungu,
      };

      const newMap = new kakao.maps.Map(mapRef.current, options);
      map.current = newMap;

      initializeGunguMarkers();
      initializeAreaMarkers();
      initializeBuildingMarkers();

      kakao.maps.event.addListener(map.current, 'zoom_changed', () => {
        const zoomLevel = newMap.getLevel();
        handleZoomChanged(zoomLevel);
      });
    }
  }, []);

  const initializeGunguMarkers = useCallback(() => {
    if (!map.current) {
      return;
    }
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
        map.current.jump(position, ZOOM_LEVEL_LIMIT.area, { animate: true });
      });

      customOverlay.setMap(map.current);
      gunguMarkers.current.push(customOverlay);
    });
  }, []);

  const initializeAreaMarkers = useCallback(() => {
    if (!map.current) {
      return;
    }
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
        // @ts-expect-error 카카오 지도 타입 패키지 미업데이트로 인한 오류
        map.current.jump(position, ZOOM_LEVEL_LIMIT.building, {
          animate: true,
        });
      });

      customOverlay.setMap(map.current);
      customOverlay.setVisible(false);
      areaMarkers.current.push(customOverlay);
    });
  }, []);

  const initializeBuildingMarkers = useCallback(() => {
    if (!map.current) {
      return;
    }
    const clusterer = new kakao.maps.MarkerClusterer({
      averageCenter: true,
      minLevel: 3,
      disableClickZoom: true,
    });
    clusterer.setStyles(BUILDING_CLUSTER_STYLES);
    clusterer.setCalculator([5, 10, 15]);

    kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: any) => {
      if (!map.current) {
        return;
      }
      const position = cluster.getCenter();
      const level = map.current.getLevel() - 1;
      // @ts-expect-error 카카오 지도 타입 패키지 미업데이트로 인한 오류
      map.current.jump(position, level, {
        animate: true,
      });
    });

    buildingClusterer.current = clusterer;

    MOCK_BUILDING_COORDS.forEach(([latitude, longitude]) => {
      const randomCategory =
        CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

      const position = new kakao.maps.LatLng(latitude, longitude);
      const buildingMarker = createBuildingMarker(randomCategory);
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: buildingMarker,
        clickable: true,
      });
      customOverlay.setMap(map.current);
      customOverlay.setVisible(false);
      buildingMarkers.current.push(customOverlay);

      clusterer.addMarker(customOverlay);
    });
  }, []);

  const handleZoomChanged = useCallback((zoomLevel: number) => {
    if (zoomLevel > ZOOM_LEVEL_LIMIT.area) {
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
      <Tab />
    </main>
  );
};

export default Map;

const MOCK_BUILDING_COORDS = [
  [37.54343390490632, 127.05174586952529],
  [37.54323537558675, 127.0524472925928],
  [37.54311807419734, 127.05283193642344],
  [37.5434696805452, 127.05234561701565],
  [37.54405479726204, 127.05353416540369],
  [37.54402043881545, 127.04968683441979],
  [37.54259725624128, 127.04873539698823],
  [37.543063646933355, 127.05364661131054],
  [37.54262139526008, 127.05529834216931],
  [37.54250447645044, 127.05484564070186],
  [37.54138688278711, 127.0556029410406],
  [37.54127928500763, 127.05448265706279],
  [37.541549730574054, 127.0541660273163],
  [37.54071122894428, 127.05539876737014],
  [37.54372912125293, 127.05636282325551],
];
