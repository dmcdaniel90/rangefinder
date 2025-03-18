import { useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Layout from './layouts/Layout.tsx';
import { GoogleMap } from './components/Map.tsx';
import Sidebar from './components/Sidebar.tsx';
import {
  defaultRadius,
  defaultCoordinates,
  defaultLocation,
} from './utils/defaults.ts';

// Google Maps API key
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Loads the Google Maps Geocoding library and calls a callback with
 * the library instance.
 *
 * @param {function} callback Called with the Geocoding library instance.
 */
const loadGeoCodingLibrary = (callback: (lib: any) => void) => {
  const lib = google.maps;
  callback(lib);
};

export default function App() {
  // Check if the Google API has loaded
  const [apiLoading, setApiLoading] = useState(true);

  // State of the geocoding library
  const [geoCodingLibrary, setGeoCodingLibrary] =
    useState<google.maps.GeocodingLibrary | null>();

  // The curret location
  const [location, setLocation] = useState<string>(defaultLocation);

  // maxRadius updates independently and does not update when the form is submitted
  const [maxRadius, setMaxRadius] = useState<string>(defaultRadius.toString());

  // The coordinates of the location
  const [coordinates, setCoordinates] =
    useState<google.maps.LatLngLiteral>(defaultCoordinates);

  // Load the geocoding library on first render
  useEffect(() => {
    loadGeoCodingLibrary((lib) => {
      setGeoCodingLibrary(lib);
    });
  }, []);

  /**
   * Called when the user submits the form.
   * Prevents the default form submission and instead geocodes the
   * location. If the geocoding is successful, it updates the
   * coordinates state with the geocoded location's coordinates.
   * If the geocoding fails, it throws an exception.
   * @param e The form event.
   */

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = location;

    if (address && geoCodingLibrary) {
      console.log('its working');
      const geocoder = new geoCodingLibrary.Geocoder();
      try {
        const results = await geocoder.geocode({ address });
        if (results) {
          const coordinates = results.results[0].geometry.location;
          setCoordinates({
            lat: coordinates.lat(),
            lng: coordinates.lng(),
          });
          console.log(coordinates);
        } else {
          throw new Error('Geocoding failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <APIProvider
      apiKey={API_KEY}
      onLoad={() => setApiLoading(false)}>
      {apiLoading && geoCodingLibrary && <div>Loading...</div>}
      {!apiLoading && (
        <Layout>
          <Sidebar
            location={location}
            setLocation={setLocation}
            maxRadius={maxRadius}
            setMaxRadius={setMaxRadius}
            handleFormSubmit={handleFormSubmit}
          />
          <GoogleMap
            homeCoordinates={coordinates}
            maxRadius={maxRadius}
          />
        </Layout>
      )}
    </APIProvider>
  );
}
