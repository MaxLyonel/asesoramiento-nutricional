import { Test, TestingModule } from '@nestjs/testing';
import { GetPatientByIdHandler } from '../get-patient-by-id.handler';
import { GetPatientByIdQuery } from '../get-patient-by-id.query';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { NotFoundException } from '@nestjs/common';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

describe('GetPatientByIdHandler', () => {
  let handler: GetPatientByIdHandler;
  let mockPatientRepo: any;

  beforeEach(async () => {
    mockPatientRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPatientByIdHandler,
        {
          provide: 'PatientRepository',
          useValue: mockPatientRepo,
        },
      ],
    }).compile();

    handler = module.get<GetPatientByIdHandler>(GetPatientByIdHandler);
  });

  describe('execute', () => {
    it('should return patient when found', async () => {
      const patientEntity = new PatientEntity();
      patientEntity.id = 1;
      patientEntity.fullName = 'Juan';
      patientEntity.lastName = 'Perez';
      patientEntity.gender = 'M';
      patientEntity.identityCard = '12345678';
      patientEntity.cellPhone = '0999999999';
      patientEntity.latitude = -0.2;
      patientEntity.longitude = -78.5;

      mockPatientRepo.findById.mockResolvedValue(patientEntity);

      const query = new GetPatientByIdQuery(1);
      const result = await handler.execute(query);

      expect(result.getFullName()).toBe('Juan');
      expect(result.getLastName()).toBe('Perez');
      expect(mockPatientRepo.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPatientRepo.findById.mockResolvedValue(null);

      const query = new GetPatientByIdQuery(999);

      await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    });

    it('should call repository with correct id', async () => {
      const patientEntity = new PatientEntity();
      patientEntity.id = 5;
      patientEntity.fullName = 'Test';
      patientEntity.lastName = 'User';
      patientEntity.gender = 'M';
      patientEntity.identityCard = '11111111';
      patientEntity.cellPhone = '1111111111';
      patientEntity.latitude = -0.2;
      patientEntity.longitude = -78.5;

      mockPatientRepo.findById.mockResolvedValue(patientEntity);

      const query = new GetPatientByIdQuery(5);
      await handler.execute(query);

      expect(mockPatientRepo.findById).toHaveBeenCalledWith(5);
    });

    it('should throw error with message Paciente no encontrado', async () => {
      mockPatientRepo.findById.mockResolvedValue(null);

      const query = new GetPatientByIdQuery(1);

      try {
        await handler.execute(query);
        fail('should have thrown');
      } catch (error: any) {
        expect(error.message).toContain('Paciente no encontrado');
      }
    });
  });
});
