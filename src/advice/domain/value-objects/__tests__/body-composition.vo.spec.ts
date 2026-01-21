import { BodyComposition } from '../body-composition.vo';

describe('BodyComposition Value Object', () => {
  it('should create with valid body composition', () => {
    const bc = new BodyComposition('Normal');
    expect(bc.getValue()).toBe('Normal');
  });

  it('should accept Sobrepeso', () => {
    const bc = new BodyComposition('Sobrepeso');
    expect(bc.getValue()).toBe('Sobrepeso');
  });

  it('should accept Obesidad', () => {
    const bc = new BodyComposition('Obesidad');
    expect(bc.getValue()).toBe('Obesidad');
  });

  it('should accept Delgado', () => {
    const bc = new BodyComposition('Delgado');
    expect(bc.getValue()).toBe('Delgado');
  });

  it('should throw error on invalid body composition', () => {
    expect(() => new BodyComposition('InvalidValue')).toThrow();
  });

  it('should have isNormal method', () => {
    const bc = new BodyComposition('Normal');
    expect(bc.isNormal()).toBe(true);
  });

  it('should return false for isNormal when not Normal', () => {
    const bc = new BodyComposition('Sobrepeso');
    expect(bc.isNormal()).toBe(false);
  });
});
