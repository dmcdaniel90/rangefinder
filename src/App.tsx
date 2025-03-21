import { useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Layout from './layouts/Layout.tsx';
import { GoogleMap } from './components/Map.tsx';
import Sidebar from './components/Sidebar.tsx';
import {
  defaultRadius,
  defaultCoordinates,
} from './utils/defaults.ts';
import useHomeForm from './hooks/useHomeForm.tsx';
import useDestinationForm from './hooks/useDestinationForm.tsx';


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

  const [radius, setRadius] = useState<number>(defaultRadius)

  // The distance between the home and destination
  const [distanceInMeters, setDistanceInMeters] = useState<number | null>(null);

  // The coordinates of the location
  const [homeCoordinates, setHomeCoordinates] =
    useState<google.maps.LatLngLiteral>(defaultCoordinates);

  // The coordinates of the destination
  const [destinationCoordinates, setDestinationCoordinates] =
    useState<google.maps.LatLngLiteral | null>(null);

  // Load the geocoding library on first render
  useEffect(() => {
    loadGeoCodingLibrary((lib) => {
      setGeoCodingLibrary(lib);
    });
  }, []);

  const handleSetRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value));
  };

  const { homeForm, homeFormSchema } = useHomeForm();
  const { destinationForm, destinationFormSchema } = useDestinationForm();


  /**
   * Called when the user submits the location form.
   * Prevents the default form submission and instead geocodes the
   * location. If the geocoding is successful, it updates the
   * coordinates state with the geocoded location's coordinates.
   * If the geocoding fails, it throws an exception.
   * @param e The form event.
   */

  const handleSetHomeCoordinates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const homeFormData = homeForm.getValues();
    const result = homeFormSchema.safeParse(homeFormData);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    const address = homeFormData.location;

    if (address && geoCodingLibrary) {
      const geocoder = new geoCodingLibrary.Geocoder();
      try {
        const results = await geocoder.geocode({ address });
        if (results) {
          const calculatedHomeCoordinates = results.results[0].geometry.location;
          setHomeCoordinates({
            lat: calculatedHomeCoordinates.lat(),
            lng: calculatedHomeCoordinates.lng(),
          });
        } else {
          throw new Error('Geocoding failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * Called when the user submits the destination form.
   * Prevents the default form submission and instead geocodes the
   * destination. If the geocoding is successful, it updates the
   * destination coordinates state with the geocoded location's coordinates.
   * If the geocoding fails, it throws an exception.
   * @param e The form event.
   */
  const handleSetDestinationCoordinates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const destinationFormData = destinationForm.getValues();
    const result = destinationFormSchema.safeParse(destinationFormData);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    const address = destinationFormData.location;

    if (address && geoCodingLibrary) {
      const geocoder = new geoCodingLibrary.Geocoder();
      try {
        const results = await geocoder.geocode({ address });
        if (results) {
          console.log('destination geocoding results', results);
          const calculatedDestinationCoordinates = results.results[0].geometry.location;
          setDestinationCoordinates({
            lat: calculatedDestinationCoordinates.lat(),
            lng: calculatedDestinationCoordinates.lng(),
          });
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
            radius={radius}
            handleSetRadius={handleSetRadius}
            handleSetHomeCoordinates={handleSetHomeCoordinates}
            handleSetDestinationCoordinates={handleSetDestinationCoordinates}
            distanceInMeters={distanceInMeters}
            homeForm={homeForm}
            destinationForm={destinationForm}
          />
          <GoogleMap
            homeCoordinates={homeCoordinates}
            destinationCoordinates={destinationCoordinates}
            radius={radius}
          />
        </Layout>
      )}
    </APIProvider>
  );
}
