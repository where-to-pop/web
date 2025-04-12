import { useCallback, useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useRef<kakao.maps.Map | null>(null);

  const initializeMap = useCallback(async () => {
    if (window.kakao && mapRef.current) {
      const options = {
        center: new kakao.maps.LatLng(37.545, 127),
        level: 8,
      };

      const newMap = new kakao.maps.Map(mapRef.current, options);
      map.current = newMap;
    }
  }, []);

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <main className='relative h-screen w-screen'>
      <div ref={mapRef} className='h-full w-full' />
    </main>
  );
};

export default Map;
