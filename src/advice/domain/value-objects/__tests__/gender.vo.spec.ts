import { Gender } from '../gender.vo';

describe('Gender Value Object', () => {
  it('should create gender with valid value', () => {
    const gender = new Gender('M');
    expect(gender.getValue()).toBe('M');
  });

  it('should accept female gender', () => {
    const gender = new Gender('F');
    expect(gender.getValue()).toBe('F');
  });

  it('should accept other gender values', () => {
    const gender = new Gender('O');
    expect(gender.getValue()).toBe('O');
  });
});
