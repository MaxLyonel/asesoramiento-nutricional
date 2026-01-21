import { DiagnosisEntity } from '../diagnosis.entity';
import { Diagnosis } from 'src/advice/domain/entities/diagnosis.entity';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';

describe('DiagnosisEntity toDomain and fromDomain', () => {
  let diagnosisEntity: DiagnosisEntity;

  beforeEach(() => {
    diagnosisEntity = new DiagnosisEntity();
    diagnosisEntity.id = 1;
    diagnosisEntity.weight = 70;
    diagnosisEntity.height = 1.75;
    diagnosisEntity.bodyComposition = 'Normal';
  });

  describe('toDomain', () => {
    it('should convert DiagnosisEntity to Diagnosis domain entity', () => {
      const diagnosis = DiagnosisEntity.toDomain(diagnosisEntity);

      expect(diagnosis).toBeInstanceOf(Diagnosis);
    });

    it('should preserve weight, height, and bodyComposition values', () => {
      const diagnosis = DiagnosisEntity.toDomain(diagnosisEntity);

      expect((diagnosis as any).weight.getValue()).toBe(70);
      expect((diagnosis as any).height.getValue()).toBe(1.75);
      expect((diagnosis as any).bodyComposition.getValue()).toBe('Normal');
    });

    it('should convert different body compositions', () => {
      const diagnosisSobrepeso = new DiagnosisEntity();
      diagnosisSobrepeso.id = 2;
      diagnosisSobrepeso.weight = 85;
      diagnosisSobrepeso.height = 1.70;
      diagnosisSobrepeso.bodyComposition = 'Sobrepeso';

      const diagnosis = DiagnosisEntity.toDomain(diagnosisSobrepeso);

      expect((diagnosis as any).bodyComposition.getValue()).toBe('Sobrepeso');
    });
  });

  describe('fromDomain', () => {
    it('should convert Diagnosis domain entity to DiagnosisEntity', () => {
      const diagnosis = DiagnosisEntity.toDomain(diagnosisEntity);
      const convertedEntity = DiagnosisEntity.fromDomain(diagnosis);

      expect(convertedEntity).toBeInstanceOf(DiagnosisEntity);
      expect(convertedEntity.weight).toBe(70);
      expect(convertedEntity.height).toBe(1.75);
      expect(convertedEntity.bodyComposition).toBe('Normal');
    });
  });

  describe('entity properties', () => {
    it('should have all required properties', () => {
      expect(diagnosisEntity.id).toBeDefined();
      expect(diagnosisEntity.weight).toBeDefined();
      expect(diagnosisEntity.height).toBeDefined();
      expect(diagnosisEntity.bodyComposition).toBeDefined();
    });
  });
});
