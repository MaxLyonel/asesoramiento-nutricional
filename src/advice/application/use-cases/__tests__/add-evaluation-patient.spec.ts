import { AddEvaluationUseCase } from '../add-evaluation-patient';
import { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

describe('AddEvaluationUseCase', () => {
  let useCase: AddEvaluationUseCase;
  let mockRepository: any;

  const createMockPatientEntity = () => {
    const entity = new PatientEntity();
    entity.id = 1;
    entity.fullName = 'Juan Perez';
    entity.lastName = 'Perez';
    entity.gender = 'M';
    entity.identityCard = '12345678';
    entity.cellPhone = '0999999999';
    entity.latitude = -0.2;
    entity.longitude = -78.5;
    entity.evaluations = [];
    return entity;
  };

  beforeEach(() => {
    mockRepository = {
      save: jest.fn().mockResolvedValue({}),
      findById: jest.fn().mockResolvedValue(createMockPatientEntity()),
      findAll: jest.fn().mockResolvedValue([createMockPatientEntity()]),
    };

    useCase = new AddEvaluationUseCase(mockRepository);
  });

  it('should add evaluation to patient', async () => {
    await useCase.execute(
      1,
      '1',
      new Date('2024-01-15'),
      72,
      1.76,
      'Normal',
      1
    );

    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should handle evaluation with different weight', async () => {
    await useCase.execute(
      1,
      '2',
      new Date('2024-01-20'),
      75,
      1.76,
      'Sobrepeso',
      1
    );

    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should handle evaluation with different height', async () => {
    await useCase.execute(
      1,
      '3',
      new Date('2024-01-25'),
      72,
      1.80,
      'Normal',
      2
    );

    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should throw error if patient not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute(999, '1', new Date(), 72, 1.76, 'Normal', 1)
    ).rejects.toThrow('Paciente no encontrado');
  });

  it('should validate nutritionist daily limit', async () => {
    await useCase.execute(
      1,
      '1',
      new Date(),
      72,
      1.76,
      'Normal',
      1
    );

    expect(mockRepository.findAll).toHaveBeenCalled();
  });
});
