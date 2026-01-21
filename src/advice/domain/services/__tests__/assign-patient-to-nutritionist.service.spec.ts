import { AssignPatientToNutritionistService } from '../assign-patient-to-nutritionist.service';
import { PatientAssignment } from '../../entities/patient-assignment.entity';

describe('AssignPatientToNutritionistService', () => {
  let service: AssignPatientToNutritionistService;
  let mockPatientAssignmentRepo: any;
  let mockPatientRepo: any;
  let mockNutritionistRepo: any;

  beforeEach(() => {
    mockPatientAssignmentRepo = {
      save: jest.fn().mockResolvedValue({} ),
    };

    mockPatientRepo = {
      findById: jest.fn().mockResolvedValue({ id: 1 }),
    };

    mockNutritionistRepo = {
      findById: jest.fn().mockResolvedValue({ id: 1 }),
    };

    service = new AssignPatientToNutritionistService(
      mockPatientAssignmentRepo,
      mockPatientRepo,
      mockNutritionistRepo
    );
  });

  describe('execute', () => {
    it('should assign patient to nutritionist', async () => {
      const patientId = 1;
      const nutritionistId = 2;
      const serviceType = 'Nutrición General';

      await service.execute(patientId, nutritionistId, serviceType);

      expect(mockPatientRepo.findById).toHaveBeenCalledWith(patientId);
      expect(mockNutritionistRepo.findById).toHaveBeenCalledWith(nutritionistId);
      expect(mockPatientAssignmentRepo.save).toHaveBeenCalled();
    });

    it('should create assignment with correct parameters', async () => {
      const patientId = 5;
      const nutritionistId = 3;
      const serviceType = 'Nutrición Deportiva';

      await service.execute(patientId, nutritionistId, serviceType);

      const callArgs = mockPatientAssignmentRepo.save.mock.calls[0][0];
      expect(callArgs).toBeInstanceOf(PatientAssignment);
    });

    it('should handle multiple assignments', async () => {
      await service.execute(1, 1, 'Type A');
      await service.execute(2, 2, 'Type B');
      await service.execute(3, 3, 'Type C');

      expect(mockPatientAssignmentRepo.save).toHaveBeenCalledTimes(3);
      expect(mockPatientRepo.findById).toHaveBeenCalledTimes(3);
      expect(mockNutritionistRepo.findById).toHaveBeenCalledTimes(3);
    });
  });
});
