import axios from 'axios';

interface Waypoint {
  location: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
}

// interface GooglePlacesResponse {
//   // The routes array.
//   routes: [
//     {
//       distanceMeters: number;
//     }
//   ];
// }

const baseUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

export const fetchDistance = async (
  origin: Waypoint,
  destination: Waypoint
) => {
  const response = await axios
    .post(
      baseUrl,
      {
        origin,
        destination,
        routingPreference: 'TRAFFIC_UNAWARE',
        units: 'METRIC',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'routes.distanceMeters',
        },
        params: {
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return response;
};
