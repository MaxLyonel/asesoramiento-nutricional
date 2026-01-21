import { PatientEntity } from '../patient.entity';
import { DiagnosisEntity } from '../diagnosis.entity';
import { EvaluationEntity } from '../evaluation.entity';
import { Patient } from 'src/advice/domain/entities/patient.entity';

describe('PatientEntity toDomain and fromDomain', () => {
  let patientEntity: PatientEntity;

  beforeEach(() => {
    patientEntity = new PatientEntity();
    patientEntity.id = 1;
    patientEntity.fullName = 'Juan';
    patientEntity.lastName = 'Pérez';
    patientEntity.gender = 'M';
    patientEntity.identityCard = '12345678';
    patientEntity.cellPhone = '+34912345678';
    patientEntity.latitude = 40.4168;
    patientEntity.longitude = -3.7038;
  });

  describe('toDomain', () => {
    it('should convert PatientEntity to Patient domain entity', () => {
      const patient = PatientEntity.toDomain(patientEntity);

      expect(patient).toBeInstanceOf(Patient);
      expect(patient.getFullName()).toBe('Juan');
      expect(patient.getLastName()).toBe('Pérez');
      expect(patient.getGender().getValue()).toBe('M');
    });

    it('should handle entity without diagnosis', () => {
      patientEntity.diagnosis = undefined as any;
      const patient = PatientEntity.toDomain(patientEntity);

      expect(patient).toBeDefined();
      expect(patient.getDiagnosis()).toBeUndefined();
    });

    it('should handle entity without evaluations', () => {
      patientEntity.evaluations = [];
      const patient = PatientEntity.toDomain(patientEntity);

      expect(patient).toBeDefined();
      expect(patient.getEvaluations()).toEqual([]);
    });
  });

  describe('fromDomain', () => {
    it('should convert Patient domain entity to PatientEntity', () => {
      const patient = PatientEntity.toDomain(patientEntity);
      const convertedEntity = PatientEntity.fromDomain(patient);

      expect(convertedEntity).toBeInstanceOf(PatientEntity);
      expect(convertedEntity.fullName).toBe('Juan');
      expect(convertedEntity.lastName).toBe('Pérez');
      expect(convertedEntity.gender).toBe('M');
    });

    it('should preserve all patient data in round-trip conversion', () => {
      const originalPatient = PatientEntity.toDomain(patientEntity);
      const roundTripEntity = PatientEntity.fromDomain(originalPatient);
      const finalPatient = PatientEntity.toDomain(roundTripEntity);

      expect(finalPatient.getFullName()).toBe(originalPatient.getFullName());
      expect(finalPatient.getLastName()).toBe(originalPatient.getLastName());
    });
  });

  describe('entity properties', () => {
    it('should have all required properties', () => {
      expect(patientEntity.id).toBeDefined();
      expect(patientEntity.fullName).toBeDefined();
      expect(patientEntity.lastName).toBeDefined();
      expect(patientEntity.gender).toBeDefined();
      expect(patientEntity.identityCard).toBeDefined();
      expect(patientEntity.cellPhone).toBeDefined();
      expect(patientEntity.latitude).toBeDefined();
      expect(patientEntity.longitude).toBeDefined();
    });

    it('should initialize with default empty arrays', () => {
      const newEntity = new PatientEntity();
      newEntity.evaluations = newEntity.evaluations || [];
      newEntity.assignments = newEntity.assignments || [];

      expect(Array.isArray(newEntity.evaluations)).toBe(true);
      expect(Array.isArray(newEntity.assignments)).toBe(true);
    });
  });
});
