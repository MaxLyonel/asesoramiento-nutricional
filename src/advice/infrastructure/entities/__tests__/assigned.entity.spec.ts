import { PatientAssignmentEntity } from '../assigned.entity';
import { PatientEntity } from '../patient.entity';
import { NutritionistEntity } from '../nutritionist.entity';

describe('PatientAssignmentEntity', () => {
  let assignmentEntity: PatientAssignmentEntity;
  let patientEntity: PatientEntity;
  let nutritionistEntity: NutritionistEntity;

  beforeEach(() => {
    patientEntity = new PatientEntity();
    patientEntity.id = 1;
    patientEntity.fullName = 'Juan';

    nutritionistEntity = new NutritionistEntity();
    nutritionistEntity.id = 1;
    nutritionistEntity.fullName = 'Dr. García';

    assignmentEntity = new PatientAssignmentEntity();
    assignmentEntity.id = 1;
    assignmentEntity.patient = patientEntity;
    assignmentEntity.nutritionist = nutritionistEntity;
    assignmentEntity.serviceType = 'Nutrición General';
    assignmentEntity.startDate = new Date('2024-01-01');
  });

  describe('entity creation', () => {
    it('should create a patient assignment entity instance', () => {
      expect(assignmentEntity).toBeDefined();
    });

    it('should have all required properties', () => {
      expect(assignmentEntity.id).toBeDefined();
      expect(assignmentEntity.patient).toBeDefined();
      expect(assignmentEntity.nutritionist).toBeDefined();
      expect(assignmentEntity.serviceType).toBeDefined();
      expect(assignmentEntity.startDate).toBeDefined();
    });
  });

  describe('entity relationships', () => {
    it('should maintain patient relationship', () => {
      expect(assignmentEntity.patient.id).toBe(1);
      expect(assignmentEntity.patient.fullName).toBe('Juan');
    });

    it('should maintain nutritionist relationship', () => {
      expect(assignmentEntity.nutritionist.id).toBe(1);
      expect(assignmentEntity.nutritionist.fullName).toBe('Dr. García');
    });
  });

  describe('entity properties', () => {
    it('should store service type', () => {
      expect(assignmentEntity.serviceType).toBe('Nutrición General');
    });

    it('should store start date', () => {
      expect(assignmentEntity.startDate).toEqual(new Date('2024-01-01'));
    });

    it('should allow null end date', () => {
      expect(assignmentEntity.endDate).toBeUndefined();
    });

    it('should store end date when set', () => {
      const endDate = new Date('2024-12-31');
      assignmentEntity.endDate = endDate;
      expect(assignmentEntity.endDate).toEqual(endDate);
    });
  });

  describe('multiple assignments', () => {
    it('should create different assignments for different patients', () => {
      const patient2 = new PatientEntity();
      patient2.id = 2;

      const assignment2 = new PatientAssignmentEntity();
      assignment2.patient = patient2;
      assignment2.nutritionist = nutritionistEntity;

      expect(assignmentEntity.patient.id).not.toBe(assignment2.patient.id);
    });
  });
});
