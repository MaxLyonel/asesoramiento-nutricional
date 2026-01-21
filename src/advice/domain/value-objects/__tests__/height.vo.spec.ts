import { Height } from '../height.vo';

describe('Height Value Object', () => {
  it('should create height with valid value', () => {
    const height = new Height(1.75);
    expect(height.getValue()).toBe(1.75);
  });

  it('should accept different height values', () => {
    const height = new Height(1.80);
    expect(height.getValue()).toBe(1.80);
  });

  it('should store height as number', () => {
    const height = new Height(1.65);
    expect(typeof height.getValue()).toBe('number');
  });
});
