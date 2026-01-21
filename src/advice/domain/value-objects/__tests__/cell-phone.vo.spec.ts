import { CellPhone } from '../cell-phone.vo';

describe('CellPhone Value Object', () => {
  it('should create with valid phone number', () => {
    const phone = new CellPhone('0999999999');
    expect(phone.value).toBe('0999999999');
  });

  it('should accept different phone numbers', () => {
    const phone = new CellPhone('0998765432');
    expect(phone.value).toBe('0998765432');
  });

  it('should store phone as string', () => {
    const phone = new CellPhone('0999999999');
    expect(typeof phone.value).toBe('string');
  });

  it('should accept phone with + prefix', () => {
    const phone = new CellPhone('+34912345678');
    expect(phone.value).toBe('+34912345678');
  });

  it('should handle different phone formats', () => {
    const phone1 = new CellPhone('+1234567890');
    const phone2 = new CellPhone('(123) 456-7890');
    
    expect(phone1.value).toBeDefined();
    expect(phone2.value).toBeDefined();
  });

  it('should create with 10 digit phone', () => {
    const phone = new CellPhone('1234567890');
    expect(phone.value).toBe('1234567890');
  });

  it('should allow empty string', () => {
    const phone = new CellPhone('');
    expect(phone.value).toBe('');
  });
});
