import { Test, TestingModule } from '@nestjs/testing';
import { AddEvaluationPatientHandler } from '../add-evaluation-patient.handler';
import { AddEvaluationPatientCommand } from '../add-evaluation-patient.command';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

describe('AddEvaluationPatientHandler', () => {
  let handler: AddEvaluationPatientHandler;
  let mockPatientRepo: any;

  const createMockPatientEntity = () => {
    const entity = new PatientEntity();
    entity.id = 1;
    entity.fullName = 'Juan';
    entity.lastName = 'Perez';
    entity.gender = 'M';
    entity.identityCard = '12345678';
    entity.cellPhone = '0999999999';
    entity.latitude = -0.2;
    entity.longitude = -78.5;
    entity.evaluations = [];
    return entity;
  };

  beforeEach(async () => {
    mockPatientRepo = {
      findById: jest.fn().mockResolvedValue(createMockPatientEntity()),
      findAll: jest.fn().mockResolvedValue([createMockPatientEntity()]),
      save: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddEvaluationPatientHandler,
        {
          provide: 'PatientRepository',
          useValue: mockPatientRepo,
        },
      ],
    }).compile();

    handler = module.get<AddEvaluationPatientHandler>(AddEvaluationPatientHandler);
  });

  describe('execute', () => {
    it('should add evaluation to patient', async () => {
      const command = new AddEvaluationPatientCommand(
        1,
        '1',
        new Date('2025-12-20'),
        72,
        1.76,
        'Normal',
        1
      );

      await handler.execute(command);

      expect(mockPatientRepo.findById).toHaveBeenCalledWith(1);
      expect(mockPatientRepo.save).toHaveBeenCalled();
    });

    it('should throw error when patient not found', async () => {
      mockPatientRepo.findById.mockResolvedValue(null);

      const command = new AddEvaluationPatientCommand(
        999,
        '100',
        new Date('2025-12-20'),
        72,
        1.76,
        'Normal',
        1
      );

      await expect(handler.execute(command)).rejects.toThrow('Paciente no encontrado');
    });
  });
});
