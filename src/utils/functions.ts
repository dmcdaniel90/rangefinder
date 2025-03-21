import { fetchDistance, Waypoint } from "./fetchDistance";

export default function convertMilesToMeters(miles: string | number): number {
  return Number.isNaN(Number(miles)) ? 0 : Number(miles) * 1609.34;
}

export const convertMetersToMiles = (meters: number): number => {
  return meters / 1609.34;
};

export const calculateDistance = async (homeCoordinates: google.maps.LatLngLiteral, destinationCoordinates: google.maps.LatLngLiteral) => {
  // Fetch the distance between the home and destination from the Routes API

  const origin: Waypoint = {
    location: {
      latLng: {
        latitude: homeCoordinates.lat,
        longitude: homeCoordinates.lng,
      },
    },
  };

  const destination: Waypoint = {
    location: {
      latLng: {
        latitude: destinationCoordinates.lat,
        longitude: destinationCoordinates.lng,
      },
    },
  };

  if (origin && destination) {
    const distance: number = await fetchDistance(origin, destination);
    return distance;
  }
}
