import { Test, TestingModule } from '@nestjs/testing';
import { GetAllPatientsHandler } from '../get-all-patients.handler';
import { GetAllPatientsQuery } from '../get-all-patients.query';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

describe('GetAllPatientsHandler', () => {
  let handler: GetAllPatientsHandler;
  let mockPatientRepo: any;

  beforeEach(async () => {
    mockPatientRepo = {
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPatientsHandler,
        {
          provide: 'PatientRepository',
          useValue: mockPatientRepo,
        },
      ],
    }).compile();

    handler = module.get<GetAllPatientsHandler>(GetAllPatientsHandler);
  });

  describe('execute', () => {
    it('should return empty array when no patients exist', async () => {
      mockPatientRepo.findAll.mockResolvedValue([]);

      const query = new GetAllPatientsQuery();
      const result = await handler.execute(query);

      expect(result).toEqual([]);
      expect(mockPatientRepo.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return all patients from repository', async () => {
      const patientEntity1 = new PatientEntity();
      patientEntity1.id = 1;
      patientEntity1.fullName = 'Juan';
      patientEntity1.lastName = 'Perez';
      patientEntity1.gender = 'M';
      patientEntity1.identityCard = '12345678';
      patientEntity1.cellPhone = '0999999999';
      patientEntity1.latitude = -0.2;
      patientEntity1.longitude = -78.5;

      const patientEntity2 = new PatientEntity();
      patientEntity2.id = 2;
      patientEntity2.fullName = 'Maria';
      patientEntity2.lastName = 'Garcia';
      patientEntity2.gender = 'F';
      patientEntity2.identityCard = '87654321';
      patientEntity2.cellPhone = '0988888888';
      patientEntity2.latitude = -0.2;
      patientEntity2.longitude = -78.5;

      mockPatientRepo.findAll.mockResolvedValue([patientEntity1, patientEntity2]);

      const query = new GetAllPatientsQuery();
      const result = await handler.execute(query);

      expect(result).toHaveLength(2);
      expect(result[0].getFullName()).toBe('Juan');
      expect(result[1].getFullName()).toBe('Maria');
    });

    it('should call repository once per query', async () => {
      mockPatientRepo.findAll.mockResolvedValue([]);

      const query = new GetAllPatientsQuery();
      await handler.execute(query);

      expect(mockPatientRepo.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
