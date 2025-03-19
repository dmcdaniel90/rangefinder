import axios from 'axios';

export interface Waypoint {
  location: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
}

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
  return response.routes[0].distanceMeters;
};
