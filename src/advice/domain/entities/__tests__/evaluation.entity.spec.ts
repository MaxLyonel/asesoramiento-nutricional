import { Evaluation } from '../evaluation.entity';
import { Weight } from '../../value-objects/weight.vo';
import { Height } from '../../value-objects/height.vo';
import { BodyComposition } from '../../value-objects/body-composition.vo';

describe('Evaluation Entity', () => {
  let evaluation: Evaluation;
  let weight: Weight;
  let height: Height;
  let bodyComposition: BodyComposition;
  let date: Date;

  beforeEach(() => {
    weight = new Weight(72);
    height = new Height(1.80);
    bodyComposition = new BodyComposition('Normal');
    date = new Date('2024-01-15');
    evaluation = new Evaluation('eval-001', date, weight, height, bodyComposition, 1, 'Initial evaluation');
  });

  describe('constructor', () => {
    it('should create an evaluation instance', () => {
      expect(evaluation).toBeDefined();
    });

    it('should create evaluation without observations', () => {
      const evalWithoutObs = new Evaluation('eval-002', date, weight, height, bodyComposition, 1);
      expect(evalWithoutObs).toBeDefined();
    });
  });

  describe('updateObservations', () => {
    it('should update observations', () => {
      evaluation.updateObservations('Updated eval notes');
      expect((evaluation as any).observations).toBe('Updated eval notes');
    });

    it('should allow empty observations', () => {
      evaluation.updateObservations('');
      expect((evaluation as any).observations).toBe('');
    });
  });

  describe('getNutritionistId', () => {
    it('should return nutritionist id', () => {
      expect(evaluation.getNutritionistId()).toBe(1);
    });
  });

  describe('getDate', () => {
    it('should return evaluation date', () => {
      expect(evaluation.getDate()).toEqual(date);
    });
  });

  describe('getters for private properties', () => {
    it('should have id', () => {
      expect((evaluation as any).id).toBe('eval-001');
    });

    it('should have weight', () => {
      expect((evaluation as any).weight).toEqual(weight);
    });

    it('should have height', () => {
      expect((evaluation as any).height).toEqual(height);
    });

    it('should have bodyComposition', () => {
      expect((evaluation as any).bodyComposition).toEqual(bodyComposition);
    });

    it('should have observations', () => {
      expect((evaluation as any).observations).toBe('Initial evaluation');
    });
  });

  describe('multiple evaluations', () => {
    it('should create different evaluations with different dates', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-20');
      
      const eval1 = new Evaluation('eval-001', date1, weight, height, bodyComposition, 1);
      const eval2 = new Evaluation('eval-002', date2, weight, height, bodyComposition, 2);

      expect(eval1.getDate()).toEqual(date1);
      expect(eval2.getDate()).toEqual(date2);
      expect(eval1.getNutritionistId()).toBe(1);
      expect(eval2.getNutritionistId()).toBe(2);
    });
  });
});
