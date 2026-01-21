import { EvaluationEntity } from '../evaluation.entity';
import { Evaluation } from 'src/advice/domain/entities/evaluation.entity';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';
import { NutritionistEntity } from '../nutritionist.entity';

describe('EvaluationEntity toDomain and fromDomain', () => {
  let evaluationEntity: EvaluationEntity;
  let nutritionistEntity: NutritionistEntity;

  beforeEach(() => {
    nutritionistEntity = new NutritionistEntity();
    nutritionistEntity.id = 1;
    nutritionistEntity.fullName = 'Dr. García';

    evaluationEntity = new EvaluationEntity();
    evaluationEntity.id = 1;
    evaluationEntity.date = new Date('2024-01-15');
    evaluationEntity.weight = 72;
    evaluationEntity.height = 1.80;
    evaluationEntity.bodyComposition = 'Normal';
    evaluationEntity.nutritionist = nutritionistEntity;
    evaluationEntity.observations = 'Good progress';
  });

  describe('toDomain', () => {
    it('should convert EvaluationEntity to Evaluation domain entity', () => {
      const evaluation = EvaluationEntity.toDomain(evaluationEntity);

      expect(evaluation).toBeInstanceOf(Evaluation);
      expect(evaluation.getNutritionistId()).toBe(1);
      expect(evaluation.getDate()).toEqual(new Date('2024-01-15'));
    });

    it('should preserve weight, height, and bodyComposition', () => {
      const evaluation = EvaluationEntity.toDomain(evaluationEntity);

      expect((evaluation as any).weight.getValue()).toBe(72);
      expect((evaluation as any).height.getValue()).toBe(1.80);
      expect((evaluation as any).bodyComposition.getValue()).toBe('Normal');
    });

    it('should handle entity without observations', () => {
      evaluationEntity.observations = undefined;
      const evaluation = EvaluationEntity.toDomain(evaluationEntity);

      expect(evaluation).toBeDefined();
    });
  });

  describe('fromDomain', () => {
    it('should convert Evaluation domain entity to EvaluationEntity', () => {
      const evaluation = EvaluationEntity.toDomain(evaluationEntity);
      const convertedEntity = EvaluationEntity.fromDomain(evaluation);

      expect(convertedEntity).toBeInstanceOf(EvaluationEntity);
      expect(convertedEntity.weight).toBe(72);
      expect(convertedEntity.height).toBe(1.80);
      expect(convertedEntity.bodyComposition).toBe('Normal');
    });
  });

  describe('entity properties', () => {
    it('should have all required properties', () => {
      expect(evaluationEntity.id).toBeDefined();
      expect(evaluationEntity.date).toBeDefined();
      expect(evaluationEntity.weight).toBeDefined();
      expect(evaluationEntity.height).toBeDefined();
      expect(evaluationEntity.bodyComposition).toBeDefined();
    });
  });
});
