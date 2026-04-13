import { CreatePatientWithDiagnosisHandler } from '../create-patient-width-diagnosis.handler';
import { CreatePatientWithDiagnosisCommand } from '../create-patient-width-diagnosis.command';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { PatientUniquenessChecker } from 'src/advice/domain/services/patient-unique.service';

describe('CreatePatientWithDiagnosisHandler', () => {
  let handler: CreatePatientWithDiagnosisHandler;
  let mockPatientRepo: any;

  beforeEach(() => {
    mockPatientRepo = {
      save: jest.fn().mockResolvedValue({}),
      findById: jest.fn().mockResolvedValue(null),
      findAll: jest.fn().mockResolvedValue([]),
      findByIdentityCard: jest.fn().mockResolvedValue(null),
    };

    const uniquenessChecker = new PatientUniquenessChecker(mockPatientRepo);
    const mockKafkaClient = { connect: jest.fn(), emit: jest.fn() };
    const mockOutboxService = { addEvent: jest.fn() };

    handler = new CreatePatientWithDiagnosisHandler(
      mockPatientRepo,
      uniquenessChecker,
      mockKafkaClient as any,
      mockOutboxService as any,
    );
  });

  describe('execute', () => {
    it('should create a patient with diagnosis', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        'Juan',
        'Perez',
        'M',
        '12345678',
        '0999999999',
        { latitude: -0.2, longitude: -78.5 },
        '1',
        70,
        1.75,
        'Normal',
      );

      const result = await handler.execute(command);

      expect(result).toBeInstanceOf(Patient);
      expect(result.getFullName()).toBe('Juan');
      expect(result.getLastName()).toBe('Perez');
      expect(mockPatientRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should save patient to repository', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        'Maria',
        'Garcia',
        'F',
        '12345678',
        '1234567890',
        { latitude: -0.2, longitude: -78.5 },
        '2',
        65,
        1.65,
        'Sobrepeso',
      );

      await handler.execute(command);

      expect(mockPatientRepo.save).toHaveBeenCalledWith(expect.any(Patient));
    });

    it('should set initial diagnosis for patient', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        'Pedro',
        'Lopez',
        'M',
        '12345678',
        '9876543210',
        { latitude: -0.2, longitude: -78.5 },
        '3',
        80,
        1.8,
        'Delgado',
      );

      const result = await handler.execute(command);
      const diagnosis = result.getInitialDiagnosis();

      expect(diagnosis).toBeDefined();
      expect((diagnosis as any).weight.getValue()).toBe(80);
      expect((diagnosis as any).height.getValue()).toBe(1.8);
    });
  });
});
