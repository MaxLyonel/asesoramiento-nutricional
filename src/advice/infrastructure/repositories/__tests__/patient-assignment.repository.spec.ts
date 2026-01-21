import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientAssignmentRepositoryImpl } from '../patient-assignment.repository.impl';
import { PatientAssignmentEntity } from '../../entities/assigned.entity';

describe('PatientAssignmentRepositoryImpl', () => {
  let repository: PatientAssignmentRepositoryImpl;
  let mockPatientAssignmentRepository: any;

  beforeEach(async () => {
    mockPatientAssignmentRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientAssignmentRepositoryImpl,
        {
          provide: getRepositoryToken(PatientAssignmentEntity),
          useValue: mockPatientAssignmentRepository,
        },
      ],
    }).compile();

    repository = module.get<PatientAssignmentRepositoryImpl>(PatientAssignmentRepositoryImpl);
  });

  describe('save', () => {
    it('should save a patient assignment', async () => {
      const assignment = {
        patientId: 1,
        nutritionistId: 1,
        serviceType: 'Nutrición General',
        startDate: new Date(),
      };

      mockPatientAssignmentRepository.save.mockResolvedValue(assignment);

      const result = await repository.save(assignment);

      expect(mockPatientAssignmentRepository.save).toHaveBeenCalledWith(assignment);
    });

    it('should throw error if save fails', async () => {
      const assignment = {
        patientId: 1,
        nutritionistId: 1,
      };

      mockPatientAssignmentRepository.save.mockResolvedValue(null);

      await expect(repository.save(assignment)).rejects.toThrow('No se pudo crear la asignación');
    });
  });
});
