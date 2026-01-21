import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientWithDiagnosisHandler } from '../create-patient-width-diagnosis.handler';
import { CreatePatientWithDiagnosisCommand } from '../create-patient-width-diagnosis.command';
import { Patient } from 'src/advice/domain/entities/patient.entity';

describe('CreatePatientWithDiagnosisHandler', () => {
  let handler: CreatePatientWithDiagnosisHandler;
  let mockPatientRepo: any;

  beforeEach(async () => {
    mockPatientRepo = {
      save: jest.fn().mockResolvedValue({}),
      findById: jest.fn().mockResolvedValue(null),
      findAll: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePatientWithDiagnosisHandler,
        {
          provide: 'PatientRepository',
          useValue: mockPatientRepo,
        },
      ],
    }).compile();

    handler = module.get<CreatePatientWithDiagnosisHandler>(
      CreatePatientWithDiagnosisHandler
    );
  });

  describe('execute', () => {
    it('should create a patient with diagnosis', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        1,
        'Juan',
        'Perez',
        'M',
        '0999999999',
        '0999999999',
        { latitude: -0.2, longitude: -78.5 },
        '1',
        70,
        1.75,
        'Normal'
      );

      const result = await handler.execute(command);

      expect(result).toBeInstanceOf(Patient);
      expect(result.getFullName()).toBe('Juan');
      expect(result.getLastName()).toBe('Perez');
      expect(mockPatientRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should save patient to repository', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        2,
        'Maria',
        'Garcia',
        'F',
        '1234567890',
        '1234567890',
        { latitude: -0.2, longitude: -78.5 },
        '2',
        65,
        1.65,
        'Sobrepeso'
      );

      await handler.execute(command);

      expect(mockPatientRepo.save).toHaveBeenCalledWith(expect.any(Patient));
    });

    it('should set initial diagnosis for patient', async () => {
      const command = new CreatePatientWithDiagnosisCommand(
        3,
        'Pedro',
        'Lopez',
        'M',
        '9876543210',
        '9876543210',
        { latitude: -0.2, longitude: -78.5 },
        '3',
        80,
        1.80,
        'Delgado'
      );

      const result = await handler.execute(command);
      const diagnosis = result.getInitialDiagnosis();

      expect(diagnosis).toBeDefined();
      expect((diagnosis as any).weight.getValue()).toBe(80);
      expect((diagnosis as any).height.getValue()).toBe(1.80);
    });
  });
});

