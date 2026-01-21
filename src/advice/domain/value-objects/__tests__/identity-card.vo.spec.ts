import { IdentityCard } from '../identity-card.vo';

describe('IdentityCard Value Object', () => {
  it('should create with valid identity card', () => {
    const ic = new IdentityCard('12345678');
    expect(ic.fullValue).toBe('12345678');
  });

  it('should accept 4 digit identity card', () => {
    const ic = new IdentityCard('1234');
    expect(ic.fullValue).toBe('1234');
  });

  it('should accept 10 digit identity card', () => {
    const ic = new IdentityCard('1234567890');
    expect(ic.fullValue).toBe('1234567890');
  });

  it('should throw error on too short identity card', () => {
    expect(() => new IdentityCard('123')).toThrow();
  });

  it('should throw error on too long identity card', () => {
    expect(() => new IdentityCard('12345678901')).toThrow();
  });

  it('should have equals method', () => {
    const ic1 = new IdentityCard('12345678');
    const ic2 = new IdentityCard('12345678');
    const ic3 = new IdentityCard('87654321');

    expect(ic1.equals(ic2)).toBe(true);
    expect(ic1.equals(ic3)).toBe(false);
  });
});
