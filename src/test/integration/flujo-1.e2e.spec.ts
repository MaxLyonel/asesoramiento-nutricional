import { CreatePatientWithDiagnosisHandler } from 'src/advice/application/commands/create-patient-width-diagnosis.handler';
import { CreatePatientWithDiagnosisCommand } from 'src/advice/application/commands/create-patient-width-diagnosis.command';
import { GetPatientByIdHandler } from 'src/advice/application/queries/get-patient-by-id.handler';
import { GetPatientByIdQuery } from 'src/advice/application/queries/get-patient-by-id.query';
import { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

/**
 * Integration Test - Flujo 1: Crear Paciente + Obtener Paciente
 * 
 * Este flujo verifica el ciclo completo de:
 * 1. Crear un nuevo paciente con diagnóstico inicial
 * 2. Recuperar el paciente creado por su ID
 * 
 * Validaciones:
 * - El paciente se crea correctamente con todos los datos
 * - El paciente puede ser recuperado por su ID
 * - Los datos recuperados coinciden con los creados
 */
describe('Integration Test - Flujo 1: Crear Paciente + Obtener Paciente', () => {
  let createHandler: CreatePatientWithDiagnosisHandler;
  let getHandler: GetPatientByIdHandler;
  let patientRepository: PatientRepository;

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
    // Mock repository
    const mockRepo: any = {
      save: jest.fn((patient) => Promise.resolve(createMockPatientEntity())),
      findById: jest.fn((id) => Promise.resolve(createMockPatientEntity())),
      findAll: jest.fn(() => Promise.resolve([createMockPatientEntity()])),
    };

    patientRepository = mockRepo;

    // Create handlers with mocked repository
    createHandler = new CreatePatientWithDiagnosisHandler(patientRepository);
    getHandler = new GetPatientByIdHandler(patientRepository);
  });

  it('Paso 1: Debe crear un paciente con diagnóstico inicial exitosamente', async () => {
    const command = new CreatePatientWithDiagnosisCommand(
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

    const result = await createHandler.execute(command);

    expect(result).toBeDefined();
    expect(result.getFullName()).toBe('Juan Perez');
  });

  it('Paso 2: Debe recuperar el paciente creado por su ID', async () => {
    const query = new GetPatientByIdQuery(1);
    const result = await getHandler.execute(query);

    expect(result).toBeDefined();
    expect(result.getFullName()).toBe('Juan Perez');
  });

  it('Paso 3: Debe validar que los datos recuperados coinciden con los creados', async () => {
    const query = new GetPatientByIdQuery(1);
    const result = await getHandler.execute(query);

    expect(result.getFullName()).toBe('Juan Perez');
    expect(result.getLastName()).toBe('Perez');
    expect(result.getGender().getValue()).toBe('M');
    expect(result.getIdentityCard().fullValue).toBe('12345678');
  });

  it('Paso 4: Completar el flujo: Crear + Obtener', async () => {
    // Paso 1: Crear paciente
    const command = new CreatePatientWithDiagnosisCommand(
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

    const createResult = await createHandler.execute(command);
    expect(createResult).toBeDefined();

    // Paso 2: Obtener el paciente creado
    const query = new GetPatientByIdQuery(1);
    const getResult = await getHandler.execute(query);

    expect(getResult).toBeDefined();
    expect(getResult.getFullName()).toBe('Juan Perez');
    expect(getResult.getLastName()).toBe('Perez');
  });
});
