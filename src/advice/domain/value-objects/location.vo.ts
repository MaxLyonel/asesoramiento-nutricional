export class Location {
  constructor(
    private readonly latitude: number,
    private readonly longitude: number
  ) {
    if (!this.isValidCoordinate(latitude, longitude)) {
      throw new Error('Coordenadas inválidas');
    }
  }

  private isValidCoordinate(lat: number, lon: number): boolean {
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  }

  equals(other: Location): boolean {
    return (
      this.latitude === other.latitude &&
      this.longitude === other.longitude
    );
  }

  toString(): string {
    return `(${this.latitude}, ${this.longitude})`;
  }

  get lat(): number {
    return this.latitude
  }

  get lng(): number {
    return this.longitude
  }
}
