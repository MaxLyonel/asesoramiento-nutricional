import { Location } from '../location.vo';

describe('Location Value Object', () => {
  it('should create with valid location', () => {
    const loc = new Location(-0.2, -78.5);
    expect(loc.lat).toBe(-0.2);
    expect(loc.lng).toBe(-78.5);
  });

  it('should accept different coordinates', () => {
    const loc = new Location(40.7128, -74.0060);
    expect(loc.lat).toBe(40.7128);
    expect(loc.lng).toBe(-74.0060);
  });

  it('should store coordinates as numbers', () => {
    const loc = new Location(1.5, 2.5);
    expect(typeof loc.lat).toBe('number');
    expect(typeof loc.lng).toBe('number');
  });

  it('should have equals method', () => {
    const loc1 = new Location(-0.2, -78.5);
    const loc2 = new Location(-0.2, -78.5);
    const loc3 = new Location(1.5, 2.5);

    expect(loc1.equals(loc2)).toBe(true);
    expect(loc1.equals(loc3)).toBe(false);
  });
});
