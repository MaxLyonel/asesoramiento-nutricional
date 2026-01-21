import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NutritionistRepositoryImpl } from '../nutritionist.repository.impl';
import { NutritionistEntity } from '../../entities/nutritionist.entity';

describe('NutritionistRepositoryImpl', () => {
  let repository: NutritionistRepositoryImpl;
  let mockNutritionistRepository: any;

  beforeEach(async () => {
    mockNutritionistRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NutritionistRepositoryImpl,
        {
          provide: getRepositoryToken(NutritionistEntity),
          useValue: mockNutritionistRepository,
        },
      ],
    }).compile();

    repository = module.get<NutritionistRepositoryImpl>(NutritionistRepositoryImpl);
  });

  describe('findById', () => {
    it('should find a nutritionist by id', async () => {
      const nutritionistId = 1;
      const mockNutritionist = {
        id: nutritionistId,
        fullName: 'Juan Pérez',
        lastName: 'Pérez',
      };

      mockNutritionistRepository.findOne.mockResolvedValue(mockNutritionist);

      const result = await repository.findById(nutritionistId);

      expect(result).toEqual(mockNutritionist);
      expect(mockNutritionistRepository.findOne).toHaveBeenCalledWith({
        where: { id: nutritionistId },
      });
    });

    it('should throw error if nutritionist not found', async () => {
      mockNutritionistRepository.findOne.mockResolvedValue(null);

      await expect(repository.findById(999)).rejects.toThrow();
    });
  });
});
