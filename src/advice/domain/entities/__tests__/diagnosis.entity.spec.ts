import { Diagnosis } from '../diagnosis.entity';
import { Weight } from '../../value-objects/weight.vo';
import { Height } from '../../value-objects/height.vo';
import { BodyComposition } from '../../value-objects/body-composition.vo';

describe('Diagnosis Entity', () => {
  let diagnosis: Diagnosis;
  let weight: Weight;
  let height: Height;
  let bodyComposition: BodyComposition;

  beforeEach(() => {
    weight = new Weight(70);
    height = new Height(1.75);
    bodyComposition = new BodyComposition('Normal');
    diagnosis = new Diagnosis('diag-001', weight, height, bodyComposition, 'Initial observation');
  });

  describe('constructor', () => {
    it('should create a diagnosis instance', () => {
      expect(diagnosis).toBeDefined();
    });

    it('should create diagnosis without observations', () => {
      const diagnosisWithoutObs = new Diagnosis('diag-002', weight, height, bodyComposition);
      expect(diagnosisWithoutObs).toBeDefined();
    });
  });

  describe('updateObservations', () => {
    it('should update observations', () => {
      diagnosis.updateObservations('Updated observations');
      // Access private field through any for testing purposes
      expect((diagnosis as any).observations).toBe('Updated observations');
    });

    it('should allow empty string observations', () => {
      diagnosis.updateObservations('');
      expect((diagnosis as any).observations).toBe('');
    });

    it('should allow long text observations', () => {
      const longText = 'a'.repeat(500);
      diagnosis.updateObservations(longText);
      expect((diagnosis as any).observations).toBe(longText);
    });
  });

  describe('getters', () => {
    it('should have id', () => {
      expect((diagnosis as any).id).toBe('diag-001');
    });

    it('should have weight', () => {
      expect((diagnosis as any).weight).toEqual(weight);
    });

    it('should have height', () => {
      expect((diagnosis as any).height).toEqual(height);
    });

    it('should have bodyComposition', () => {
      expect((diagnosis as any).bodyComposition).toEqual(bodyComposition);
    });

    it('should have observations', () => {
      expect((diagnosis as any).observations).toBe('Initial observation');
    });
  });
});
