import { PatientAssignment } from '../patient-assignment.entity';

describe('PatientAssignment Entity', () => {
  let patientAssignment: PatientAssignment;
  const pastDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  beforeEach(() => {
    patientAssignment = new PatientAssignment(1, 1, 'Nutrición General', pastDate);
  });

  describe('constructor', () => {
    it('should create a patient assignment instance', () => {
      expect(patientAssignment).toBeDefined();
    });

    it('should throw error if startDate is in future', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      expect(() => {
        new PatientAssignment(1, 1, 'Nutrición General', futureDate);
      }).toThrow('La fecha de inicio no puede ser futura.');
    });

    it('should accept date in past or today', () => {
      const today = new Date();
      expect(() => {
        new PatientAssignment(1, 1, 'Nutrición General', today);
      }).not.toThrow();
    });
  });

  describe('endAssignment', () => {
    it('should end assignment with valid date', () => {
      const endDate = new Date();
      patientAssignment.endAssignment(endDate);
      expect(patientAssignment.isActive()).toBe(false);
    });

    it('should throw error if end date is before start date', () => {
      const beforeStartDate = new Date(pastDate.getTime() - 1000);
      expect(() => {
        patientAssignment.endAssignment(beforeStartDate);
      }).toThrow('La fecha de finalización no puede ser anterior al inicio.');
    });

    it('should accept end date same as start date', () => {
      expect(() => {
        patientAssignment.endAssignment(pastDate);
      }).not.toThrow();
    });
  });

  describe('isActive', () => {
    it('should return true when no end date', () => {
      expect(patientAssignment.isActive()).toBe(true);
    });

    it('should return false when assignment has ended', () => {
      const pastEndDate = new Date(new Date().getTime() - 1000);
      patientAssignment.endAssignment(pastEndDate);
      expect(patientAssignment.isActive()).toBe(false);
    });

    it('should return true when end date is in future', () => {
      const futureEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      patientAssignment.endAssignment(futureEndDate);
      expect(patientAssignment.isActive()).toBe(true);
    });
  });

  describe('toPrimitives', () => {
    it('should return object with all properties', () => {
      const primitives = patientAssignment.toPrimitives();
      expect(primitives).toHaveProperty('patientId', 1);
      expect(primitives).toHaveProperty('nutritionistId', 1);
      expect(primitives).toHaveProperty('serviceType', 'Nutrición General');
      expect(primitives).toHaveProperty('startDate');
      expect(primitives).toHaveProperty('endDate', null);
      expect(primitives).toHaveProperty('active', true);
    });

    it('should include end date when assignment is ended', () => {
      const endDate = new Date();
      patientAssignment.endAssignment(endDate);
      const primitives = patientAssignment.toPrimitives();
      expect(primitives.endDate).toBeDefined();
      expect(primitives.active).toBe(false);
    });
  });

  describe('getPatientId', () => {
    it('should return patient id', () => {
      expect(patientAssignment.getPatientId()).toBe(1);
    });
  });

  describe('getNutritionistId', () => {
    it('should return nutritionist id', () => {
      expect(patientAssignment.getNutritionistId()).toBe(1);
    });
  });

  describe('getServiceType', () => {
    it('should return service type', () => {
      expect(patientAssignment.getServiceType()).toBe('Nutrición General');
    });
  });

  describe('getStartDate', () => {
    it('should return start date', () => {
      expect(patientAssignment.getStartDate()).toEqual(pastDate);
    });
  });

  describe('getEndDate', () => {
    it('should return null when no end date', () => {
      expect(patientAssignment.getEndDate()).toBeNull();
    });

    it('should return end date when set', () => {
      const endDate = new Date();
      patientAssignment.endAssignment(endDate);
      expect(patientAssignment.getEndDate()).toEqual(endDate);
    });
  });
});
