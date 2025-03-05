import { APIProvider, Map } from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface GoogleMapProps {
  homeCoordinates: google.maps.LatLngLiteral | null;
}

export default function GoogleMap({ homeCoordinates }: GoogleMapProps) {
  // Check if the API key is set
  if (!API_KEY) {
    throw new Error('Missing Google Maps API key');
  }

  // Set the default center
  const defaultCenter: google.maps.LatLngLiteral = {
    lat: 51.5,
    lng: -0.1,
  }; // London

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '100%', height: '100vh' }}
        defaultZoom={8}
        gestureHandling={'none'}
        disableDefaultUI={false}
        center={homeCoordinates || defaultCenter}
        zoom={homeCoordinates ? 12 : 8}
      />
    </APIProvider>
  );
}
