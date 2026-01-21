import { Nutritionist } from '../nutritionist.entity';
import { IdentityCard } from '../../value-objects/identity-card.vo';
import { CellPhone } from '../../value-objects/cell-phone.vo';

describe('Nutritionist Entity', () => {
  let nutritionist: Nutritionist;
  let identityCard: IdentityCard;
  let cellPhone: CellPhone;

  beforeEach(() => {
    identityCard = new IdentityCard('12345678');
    cellPhone = new CellPhone('+34912345678');
    nutritionist = new Nutritionist(
      1,
      'Juan',
      'Pérez',
      identityCard,
      cellPhone,
      'Nutrición Deportiva'
    );
  });

  describe('constructor', () => {
    it('should create a nutritionist instance', () => {
      expect(nutritionist).toBeDefined();
    });
  });

  describe('ensureNotDuplicate', () => {
    it('should throw error if duplicate nutritionist exists', () => {
      const existing = [nutritionist];
      const duplicate = new Nutritionist(
        2,
        'Juan',
        'Pérez',
        identityCard,
        cellPhone,
        'Nutrición Deportiva'
      );

      expect(() => {
        Nutritionist.ensureNotDuplicate(existing, duplicate);
      }).toThrow('Nutricionista duplicado: ya existe un registro con el mismo CI.');
    });

    it('should not throw error if nutritionist is unique', () => {
      const existing = [nutritionist];
      const unique = new Nutritionist(
        2,
        'Maria',
        'García',
        new IdentityCard('87654321'),
        new CellPhone('+34987654321'),
        'Nutrición Clínica'
      );

      expect(() => {
        Nutritionist.ensureNotDuplicate(existing, unique);
      }).not.toThrow();
    });

    it('should handle empty existing list', () => {
      const unique = new Nutritionist(
        1,
        'Juan',
        'Pérez',
        identityCard,
        cellPhone,
        'Nutrición Deportiva'
      );

      expect(() => {
        Nutritionist.ensureNotDuplicate([], unique);
      }).not.toThrow();
    });
  });

  describe('assignPatient', () => {
    it('should assign a patient', () => {
      nutritionist.assignPatient(1);
      expect(nutritionist.getAssignedPatients()).toContain(1);
    });

    it('should throw error when assigning duplicate patient', () => {
      nutritionist.assignPatient(1);
      expect(() => {
        nutritionist.assignPatient(1);
      }).toThrow('El paciente ya está asignado a este nutricionista.');
    });

    it('should assign multiple patients', () => {
      nutritionist.assignPatient(1);
      nutritionist.assignPatient(2);
      nutritionist.assignPatient(3);
      expect(nutritionist.getAssignedPatients()).toEqual([1, 2, 3]);
    });
  });

  describe('unassignPatient', () => {
    it('should remove assigned patient', () => {
      nutritionist.assignPatient(1);
      nutritionist.assignPatient(2);
      nutritionist.unassignPatient(1);
      expect(nutritionist.getAssignedPatients()).toEqual([2]);
    });

    it('should not throw error when unassigning non-existent patient', () => {
      expect(() => {
        nutritionist.unassignPatient(999);
      }).not.toThrow();
    });
  });

  describe('getAssignedPatients', () => {
    it('should return copy of assigned patients', () => {
      nutritionist.assignPatient(1);
      nutritionist.assignPatient(2);
      const patients = nutritionist.getAssignedPatients();
      patients.push(999);
      expect(nutritionist.getAssignedPatients()).not.toContain(999);
    });

    it('should return empty array when no patients assigned', () => {
      expect(nutritionist.getAssignedPatients()).toEqual([]);
    });
  });
});
