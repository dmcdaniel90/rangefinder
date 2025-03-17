export default function convertMilesToMeters(miles: string | number): number {
  return Number.isNaN(Number(miles)) ? 0 : Number(miles) * 1609.34;
}
