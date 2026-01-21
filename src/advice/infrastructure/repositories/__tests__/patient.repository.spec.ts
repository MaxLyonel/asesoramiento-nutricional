import { PatientRepositoryImpl } from '../patient.repository.impl';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { PatientEntity } from '../../entities/patient.entity';

describe('PatientRepositoryImpl', () => {
  let repository: PatientRepositoryImpl;
  let mockTypeOrmRepository: any;

  const mockPatientEntity = {
    id: 1,
    fullName: 'Juan Perez',
    lastName: 'Perez',
    gender: 'M',
    identityCard: '12345678',
    cellPhone: '0999999999',
    latitude: -0.2,
    longitude: -78.5,
  };

  beforeEach(() => {
    mockTypeOrmRepository = {
      save: jest.fn().mockResolvedValue(mockPatientEntity),
      findOne: jest.fn().mockResolvedValue(mockPatientEntity),
      find: jest.fn().mockResolvedValue([mockPatientEntity]),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    // Directamente instanciar sin NestJS TestingModule para evitar circular dependency
    repository = new PatientRepositoryImpl(mockTypeOrmRepository);
  });

  it('should save a patient', async () => {
    const patient = new Patient(
      1,
      'Juan Perez',
      'Perez',
      new Gender('M'),
      new IdentityCard('12345678'),
      new CellPhone('0999999999'),
      new Location(-0.2, -78.5)
    );

    await repository.save(patient);

    expect(mockTypeOrmRepository.save).toHaveBeenCalled();
  });

  it('should find a patient by id', async () => {
    const result = await repository.findById(1);

    expect(result).toBeDefined();
    expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['evaluations', 'diagnosis'],
    });
  });

  it('should find all patients', async () => {
    const result = await repository.findAll();

    expect(Array.isArray(result)).toBe(true);
    expect(mockTypeOrmRepository.find).toHaveBeenCalled();
  });
});
