export default function convertMilesToMeters(miles: string | number): number {
  return Number.isNaN(Number(miles)) ? 0 : Number(miles) * 1609.34;
}

export const convertMetersToMiles = (meters: number): number => {
  return meters / 1609.34;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // Radius of the earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in meters
  return distance;
};

export const checkIfWithinRadius = (
  coordinates: google.maps.LatLngLiteral,
  destinationCoordinates: google.maps.LatLngLiteral | null,
  radiusInMiles: number
): boolean => {
  if (!destinationCoordinates) {
    return false;
  }

  // Convert to miles
  const radiusInMeters = convertMetersToMiles(radiusInMiles);

  let distance = calculateDistance(
    coordinates.lat,
    coordinates.lng,
    destinationCoordinates.lat,
    destinationCoordinates.lng
  );

  return distance <= radiusInMeters;
};
