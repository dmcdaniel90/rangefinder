import { Map, Marker } from '@vis.gl/react-google-maps';

import { Circle } from './Circle';
import convertMilesToMeters from '../utils/convertMilesToMeters';

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

export const GoogleMap = ({ homeCoordinates, maxRadius }: GoogleMapProps) => {
  const radiusInMeters = convertMilesToMeters(maxRadius);

  return (
    <Map
      style={{ width: '100%', height: '100vh' }}
      defaultZoom={8}
      gestureHandling={'greedy'}
      disableDefaultUI={false}
      center={homeCoordinates}>
      {homeCoordinates && (
        <Marker
          position={homeCoordinates}
          draggable={false}
        />
      )}
      {homeCoordinates && (
        <Circle
          center={homeCoordinates}
          radius={radiusInMeters}
          {...radiusOptions}
        />
      )}
    </Map>
  );
};
