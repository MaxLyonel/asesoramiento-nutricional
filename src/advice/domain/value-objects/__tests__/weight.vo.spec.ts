import { Weight } from '../weight.vo';

describe('Weight Value Object', () => {
  it('should create weight with valid value', () => {
    const weight = new Weight(70);
    expect(weight.getValue()).toBe(70);
  });

  it('should accept different weight values', () => {
    const weight = new Weight(85.5);
    expect(weight.getValue()).toBe(85.5);
  });

  it('should store weight as number', () => {
    const weight = new Weight(65);
    expect(typeof weight.getValue()).toBe('number');
  });

  it('should accept minimum weight value', () => {
    const weight = new Weight(1);
    expect(weight.getValue()).toBe(1);
  });

  it('should accept large weight values', () => {
    const weight = new Weight(300);
    expect(weight.getValue()).toBe(300);
  });

  it('should store decimal weight values', () => {
    const weight = new Weight(72.5);
    expect(weight.getValue()).toBe(72.5);
  });

  it('should handle weight zero', () => {
    const weight = new Weight(0);
    expect(weight.getValue()).toBe(0);
  });
});
