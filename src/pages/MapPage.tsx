import { AREA_COORDS, GUNGU_COORDS } from 'constants/regions';
import { useCallback, useEffect, useRef } from 'react';
import { createAreaMarker, createGunguMarker } from 'utils/map.util';

const ZOOM_LEVEL_LIMIT = {
  gungu: 8,
  area: 6,
  building: 4,
};

const Map = () => {
  const isInitialized = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useRef<kakao.maps.Map | null>(null);
  const gunguMarkers = useRef<kakao.maps.CustomOverlay[]>([]);
  const areaMarkers = useRef<kakao.maps.CustomOverlay[]>([]);

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

      kakao.maps.event.addListener(map.current, 'zoom_changed', () => {
        const zoomLevel = newMap.getLevel();
        handleZoomChanged(zoomLevel);
      });
    }
  }, []);

  const initializeGunguMarkers = useCallback(() => {
    const gunguWithCoords = Object.entries(GUNGU_COORDS).slice(0, 6);
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
      customOverlay.setMap(map.current);
      gunguMarkers.current.push(customOverlay);
    });
  }, []);

  const initializeAreaMarkers = useCallback(() => {
    const areaWithCoords = Object.entries(AREA_COORDS);
    areaWithCoords.forEach(([area, coordinates], index) => {
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
      customOverlay.setMap(map.current);
      customOverlay.setVisible(false);
      areaMarkers.current.push(customOverlay);
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
    } else if (zoomLevel > ZOOM_LEVEL_LIMIT.building) {
      gunguMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      areaMarkers.current.forEach((marker) => {
        marker.setVisible(true);
      });
    } else {
      gunguMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
      areaMarkers.current.forEach((marker) => {
        marker.setVisible(false);
      });
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
    </main>
  );
};

export default Map;
