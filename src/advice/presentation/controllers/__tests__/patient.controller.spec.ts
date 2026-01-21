import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../patient.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { HttpException } from '@nestjs/common';

describe('PatientController', () => {
  let controller: PatientController;
  let mockCommandBus: any;
  let mockQueryBus: any;

  beforeEach(async () => {
    mockCommandBus = {
      execute: jest.fn(),
    };

    mockQueryBus = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  describe('createPatientWithDiagnosis', () => {
    it('should create patient and return success response', async () => {
      const patient = new Patient(
        1,
        'Juan',
        'Perez',
        new Gender('M'),
        new IdentityCard('12345678'),
        new CellPhone('0999999999'),
        new Location(-0.2, -78.5)
      );

      mockCommandBus.execute.mockResolvedValue(patient);

      const body = {
        id: 1,
        fullName: 'Juan',
        lastName: 'Perez',
        gender: 'M',
        identityCard: '12345678',
        cellPhone: '0999999999',
        location: { latitude: -0.2, longitude: -78.5 },
        diagnosisId: 1,
        weight: 70,
        height: 175,
        bodyComposition: { fat: 20 },
      };

      const result = await controller.createPatientWithDiagnosis(body);

      expect(result.status).toBe('success');
      expect(result.message).toBe('Registro exitoso');
      expect(mockCommandBus.execute).toHaveBeenCalled();
    });
  });

  describe('addEvaluation', () => {
    it('should add evaluation and return success response', async () => {
      mockCommandBus.execute.mockResolvedValue({});

      const body = {
        patientId: 1,
        evaluationId: 1,
        date: new Date(),
        weight: 72,
        height: 176,
        bodyComposition: { fat: 22 },
      };

      const result = await controller.addEvaluation(body);

      expect(result.status).toBe('success');
      expect(result.message).toBe('Evaluacion realizada exitosamente');
      expect(mockCommandBus.execute).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return all patients', async () => {
      const patients = [
        new Patient(
          1,
          'Juan',
          'Perez',
          new Gender('M'),
          new IdentityCard('12345678'),
          new CellPhone('0999999999'),
          new Location(-0.2, -78.5)
        ),
      ];

      mockQueryBus.execute.mockResolvedValue(patients);

      const result = await controller.getAll();

      expect(result.status).toBe('success');
      expect(result.message).toBe('Pacientes obtenidos exitosamente');
      expect(result.data).toEqual(patients);
    });
  });

  describe('getById', () => {
    it('should return patient by id', async () => {
      const patient = new Patient(
        1,
        'Juan',
        'Perez',
        new Gender('M'),
        new IdentityCard('12345678'),
        new CellPhone('0999999999'),
        new Location(-0.2, -78.5)
      );

      mockQueryBus.execute.mockResolvedValue(patient);

      const result = await controller.getById('1');

      expect(result.status).toBe('success');
      expect(result.message).toBe('Paciente obtenido exitosamente');
      expect(result.data).toEqual(patient);
    });

    it('should convert id string to number', async () => {
      const patient = new Patient(
        5,
        'Test',
        'User',
        new Gender('M'),
        new IdentityCard('11111111'),
        new CellPhone('1111111111'),
        new Location(-0.2, -78.5)
      );

      mockQueryBus.execute.mockResolvedValue(patient);

      await controller.getById('5');

      expect(mockQueryBus.execute).toHaveBeenCalled();
    });
  });
});
