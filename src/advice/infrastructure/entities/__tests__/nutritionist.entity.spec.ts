import { NutritionistEntity } from '../nutritionist.entity';

describe('NutritionistEntity', () => {
  let nutritionistEntity: NutritionistEntity;

  beforeEach(() => {
    nutritionistEntity = new NutritionistEntity();
    nutritionistEntity.id = 1;
    nutritionistEntity.fullName = 'Dr. Juan García';
    nutritionistEntity.specialization = 'Nutrición Deportiva';
  });

  describe('entity creation', () => {
    it('should create a nutritionist entity instance', () => {
      expect(nutritionistEntity).toBeDefined();
    });

    it('should have all required properties', () => {
      expect(nutritionistEntity.id).toBeDefined();
      expect(nutritionistEntity.fullName).toBeDefined();
      expect(nutritionistEntity.specialization).toBeDefined();
    });
  });

  describe('entity properties', () => {
    it('should store and retrieve full name', () => {
      expect(nutritionistEntity.fullName).toBe('Dr. Juan García');
    });

    it('should store and retrieve specialization', () => {
      expect(nutritionistEntity.specialization).toBe('Nutrición Deportiva');
    });

    it('should have relationships arrays', () => {
      nutritionistEntity.evaluations = [];
      nutritionistEntity.assignments = [];

      expect(Array.isArray(nutritionistEntity.evaluations)).toBe(true);
      expect(Array.isArray(nutritionistEntity.assignments)).toBe(true);
    });
  });

  describe('multiple nutritionists', () => {
    it('should create different nutritionist entities', () => {
      const nut1 = new NutritionistEntity();
      nut1.id = 1;
      nut1.fullName = 'Dr. García';

      const nut2 = new NutritionistEntity();
      nut2.id = 2;
      nut2.fullName = 'Dra. López';

      expect(nut1.id).not.toBe(nut2.id);
      expect(nut1.fullName).not.toBe(nut2.fullName);
    });
  });
});
