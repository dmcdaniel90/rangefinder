import { memo } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { Circle } from './Circle';
import convertMilesToMeters from '../utils/convertMilesToMeters';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface GoogleMapProps {
  homeCoordinates: google.maps.LatLngLiteral | null;
  maxRadius: string;
}

const radiusOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

export const GoogleMap = memo(
  ({ homeCoordinates, maxRadius }: GoogleMapProps) => {
    // Check if the API key is set
    if (!API_KEY) {
      throw new Error('Missing Google Maps API key');
    }

    // Set the default center
    const defaultCenter: google.maps.LatLngLiteral = {
      lat: 51.5,
      lng: -0.1,
    }; // London

    const radius = convertMilesToMeters(maxRadius);

    return (
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: '100%', height: '100vh' }}
          defaultZoom={8}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          center={homeCoordinates || defaultCenter}>
          {homeCoordinates && (
            <Marker
              position={homeCoordinates}
              draggable={false}
            />
          )}
          {homeCoordinates && (
            <Circle
              center={homeCoordinates}
              radius={radius}
              {...radiusOptions}
            />
          )}
        </Map>
      </APIProvider>
    );
  }
);
