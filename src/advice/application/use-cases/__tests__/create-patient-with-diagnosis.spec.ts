import { CreatePatientWithDiagnosis } from '../create-patient-with-diagnosis';
import { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { Diagnosis } from 'src/advice/domain/entities/diagnosis.entity';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';

describe('CreatePatientWithDiagnosis UseCase', () => {
  let useCase: CreatePatientWithDiagnosis;
  let mockRepository: any;

  const mockPatient = new Patient(
    1,
    'Juan Perez',
    'Perez',
    new Gender('M'),
    new IdentityCard('12345678'),
    new CellPhone('0999999999'),
    new Location(-0.2, -78.5)
  );

  beforeEach(() => {
    mockRepository = {
      save: jest.fn().mockResolvedValue(mockPatient),
      findById: jest.fn().mockResolvedValue(mockPatient),
      findAll: jest.fn().mockResolvedValue([mockPatient]),
    };

    useCase = new CreatePatientWithDiagnosis(mockRepository);
  });

  it('should create a patient with diagnosis', async () => {
    const result = await useCase.execute(
      1,
      'Juan Perez',
      'Perez',
      'M',
      '12345678',
      '0999999999',
      { latitude: -0.2, longitude: -78.5 },
      '1',
      70,
      1.75,
      'Normal'
    );

    expect(result).toBeDefined();
    expect(result.getFullName()).toBe('Juan Perez');
  });

  it('should validate that patient is saved with diagnosis', async () => {
    const result = await useCase.execute(
      1,
      'Maria Garcia',
      'Garcia',
      'F',
      '87654321',
      '0999111111',
      { latitude: -0.2, longitude: -78.5 },
      '1',
      65,
      1.65,
      'Sobrepeso'
    );

    expect(result.getInitialDiagnosis()).toBeDefined();
  });
});
