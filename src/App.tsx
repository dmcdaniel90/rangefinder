import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Layout from './layouts/Layout.tsx';
import { GoogleMap } from './components/Map.tsx';
import Sidebar from './components/Sidebar.tsx';

export default function App() {
  const defaultRadius = 25;

  // The input state that updates with keystrokes
  const [homeLocation, setHomeLocation] = useState<string>('Swindon');

  // The submitted location when the form is submitted
  const [submittedLocation, setSubmittedLocation] = useState<string>('Swindon');

  // maxRadius updates independently and does not update when the form is submitted
  const [maxRadius, setMaxRadius] = useState<string>(defaultRadius.toString());

  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const handleSettingsChange = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: homeLocation }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates({ lat: location.lat(), lng: location.lng() });
        console.log(location, coordinates);
      } else {
        throw new Error('Location not found');
      }
    });

    setSubmittedLocation(homeLocation);
  };

  useEffect(() => {
    // Check if maxRadius is a valid number then update the state
    const parsedMaxRadius = parseInt(maxRadius, 10);
    if (!isNaN(parsedMaxRadius)) {
      setMaxRadius(parsedMaxRadius.toString());
    }
  }, [maxRadius]);

  return (
    <Layout>
      <Sidebar
        homeLocation={homeLocation}
        setHomeLocation={setHomeLocation}
        maxRadius={maxRadius}
        setMaxRadius={setMaxRadius}
        defaultRadius={defaultRadius}
        handleSettingsChange={handleSettingsChange}
      />
      <GoogleMap
        homeCoordinates={coordinates}
        maxRadius={maxRadius}
      />
    </Layout>
  );
}
