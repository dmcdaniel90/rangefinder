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
// import { checkIfWithinRadius } from './utils/functions.ts';
import { fetchDistance } from './utils/fetchDistance.ts';
import { checkIfWithinRadius } from './utils/functions.ts';

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


  // The current location
  const [location, setLocation] = useState<string>(defaultLocation);

  // The requsted destination
  const [destination, setDestination] = useState<string>('');

  // maxRadiusInMiles updates independently and does not update when the form is submitted
  const [maxRadiusInMiles, setMaxRadiusInMiles] = useState<string>(
    defaultRadius.toString()
  );

  // The distance between the home and destination
  const [distanceInMeters, setDistanceInMeters] = useState<number | null>(null);

  const [destinationInRadius, setDestinationInRadius] = useState<boolean>(false);

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

  /**
   * Called when the user submits the location form.
   * Prevents the default form submission and instead geocodes the
   * location. If the geocoding is successful, it updates the
   * coordinates state with the geocoded location's coordinates.
   * If the geocoding fails, it throws an exception.
   * @param e The form event.
   */

  const handleSetLocation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = location;

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
  const handleSetDestination = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = destination;
    if (address && geoCodingLibrary) {
      const geocoder = new geoCodingLibrary.Geocoder();
      try {
        const results = await geocoder.geocode({ address });
        if (results) {
          const calculatedDestinationCoordinates = results.results[0].geometry.location;
          setDestinationCoordinates({
            lat: calculatedDestinationCoordinates.lat(),
            lng: calculatedDestinationCoordinates.lng(),
          });

          //! See functions.ts for the implementation of the following functions
          // // Fetch the distance between the home and destination from the Routes API
          // if (homeCoordinates && calculatedDestinationCoordinates) {
          //   const distance = await fetchDistance(
          //     {
          //       location: {
          //         latLng: {
          //           latitude: homeCoordinates.lat,
          //           longitude: homeCoordinates.lng,
          //         },
          //       },
          //     },
          //     {
          //       location: {
          //         latLng: {
          //           latitude: calculatedDestinationCoordinates.lat(),
          //           longitude: calculatedDestinationCoordinates.lng(),
          //         },
          //       },
          //     }
          //   );

          // } else {
          //   throw new Error('Geocoding failed');
          // }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //? Figure out how to check if the destination is within the radius
  // useEffect(() => {
  //   if (geoCodingLibrary && distanceInMeters) {
  //     const isWithinRadius = checkIfWithinRadius(
  //       distanceInMeters,
  //       parseInt(maxRadiusInMiles)
  //     );

  //     setDestinationInRadius(isWithinRadius);
  //   }
  // }, [distanceInMeters]);



  //^ Log if the destination is within the radius
  // useEffect(() => {
  //   console.log(`Destination ${destination} is in radius from ${location}? : ${destinationInRadius}`);
  // }, [destinationInRadius]);

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
            setDestination={setDestination}
            maxRadius={maxRadiusInMiles}
            setMaxRadius={setMaxRadiusInMiles}
            handleSetLocation={handleSetLocation}
            handleSetDestination={handleSetDestination}
          />
          <GoogleMap
            homeCoordinates={homeCoordinates}
            destinationCoordinates={destinationCoordinates}
            maxRadiusInMiles={maxRadiusInMiles}
          />
        </Layout>
      )}
    </APIProvider>
  );
}
