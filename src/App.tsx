import Layout from './layouts/Layout.tsx';
import GoogleMap from './components/Map.tsx';
import Sidebar from './components/Sidebar.tsx';
import { useEffect, useState } from 'react';

export default function App() {
  const defaultRadius = 25;

  const [homeLocation, setHomeLocation] = useState<string>('Swindon');
  const [maxRadius, setMaxRadius] = useState<string>(defaultRadius.toString());
  const [homeCoordinates, setHomeCoordinates] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleHomeLocationChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert the location to coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: homeLocation }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        setHomeCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        setHomeCoordinates(null);
      }
    });
  };

  useEffect(() => {
    console.log(homeCoordinates); // Logs the updated state
  }, [homeCoordinates]);

  return (
    <Layout>
      <Sidebar
        homeLocation={homeLocation}
        setHomeLocation={setHomeLocation}
        maxRadius={maxRadius}
        setMaxRadius={setMaxRadius}
        defaultRadius={defaultRadius}
        handleHomeLocationChange={handleHomeLocationChange}
      />
      <GoogleMap homeCoordinates={homeCoordinates} />
    </Layout>
  );
}
