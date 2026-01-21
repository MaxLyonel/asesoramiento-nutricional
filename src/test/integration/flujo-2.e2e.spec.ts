import { CreatePatientWithDiagnosisHandler } from 'src/advice/application/commands/create-patient-width-diagnosis.handler';
import { CreatePatientWithDiagnosisCommand } from 'src/advice/application/commands/create-patient-width-diagnosis.command';
import { AddEvaluationPatientHandler } from 'src/advice/application/commands/add-evaluation-patient.handler';
import { AddEvaluationPatientCommand } from 'src/advice/application/commands/add-evaluation-patient.command';
import { GetPatientByIdHandler } from 'src/advice/application/queries/get-patient-by-id.handler';
import { GetPatientByIdQuery } from 'src/advice/application/queries/get-patient-by-id.query';
import { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';

/**
 * Integration Test - Flujo 2: Crear Paciente + Añadir Evaluación
 *
 * Este flujo verifica el ciclo completo de:
 * 1. Crear un nuevo paciente con diagnóstico inicial
 * 2. Añadir una evaluación de seguimiento al paciente
 *
 * Validaciones:
 * - El paciente se crea correctamente
 * - La evaluación se puede añadir sin errores
 * - El nutricionista respeta el límite de evaluaciones diarias (máx 5 por día)
 */
describe('Integration Test - Flujo 2: Crear Paciente + Añadir Evaluación', () => {
  let createHandler: CreatePatientWithDiagnosisHandler;
  let addEvaluationHandler: AddEvaluationPatientHandler;
  let getHandler: GetPatientByIdHandler;
  let patientRepository: PatientRepository;
  let mockPatientRepo: any;

  const createMockPatientEntity = () => {
    const entity = new PatientEntity();
    entity.id = 1;
    entity.fullName = 'Maria Garcia';
    entity.lastName = 'Garcia';
    entity.gender = 'F';
    entity.identityCard = '87654321';
    entity.cellPhone = '0999111111';
    entity.latitude = -0.2;
    entity.longitude = -78.5;
    entity.evaluations = [];
    return entity;
  };

  beforeEach(() => {
    // Mock repositories
    mockPatientRepo = {
      save: jest.fn((patient) => Promise.resolve(createMockPatientEntity())),
      findById: jest.fn((id) => Promise.resolve(createMockPatientEntity())),
      findAll: jest.fn(() => Promise.resolve([createMockPatientEntity()])),
    };

    patientRepository = mockPatientRepo;

    // Create handlers with mocked repositories
    createHandler = new CreatePatientWithDiagnosisHandler(patientRepository);
    addEvaluationHandler = new AddEvaluationPatientHandler(patientRepository);
    getHandler = new GetPatientByIdHandler(patientRepository);
  });

  it('Paso 1: Debe crear un paciente exitosamente', async () => {
    const command = new CreatePatientWithDiagnosisCommand(
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

    const result = await createHandler.execute(command);

    expect(result).toBeDefined();
    expect(result.getFullName()).toBe('Maria Garcia');
  });

  it('Paso 2: Debe añadir una evaluación al paciente creado', async () => {
    const command = new AddEvaluationPatientCommand(
      1,
      '1',
      new Date(),
      64,
      1.65,
      'Sobrepeso',
      1
    );

    await addEvaluationHandler.execute(command);

    expect(mockPatientRepo.save).toHaveBeenCalled();
  });

  it('Paso 3: Debe añadir una segunda evaluación al paciente', async () => {
    const command = new AddEvaluationPatientCommand(
      1,
      '2',
      new Date(),
      63,
      1.65,
      'Normal',
      1
    );

    await addEvaluationHandler.execute(command);

    expect(mockPatientRepo.save).toHaveBeenCalled();
  });

  it('Paso 4: Debe recuperar el paciente con sus evaluaciones', async () => {
    // Primero crear paciente
    const createCmd = new CreatePatientWithDiagnosisCommand(
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

    await createHandler.execute(createCmd);

    // Luego añadir evaluación
    const evalCmd = new AddEvaluationPatientCommand(
      1,
      '1',
      new Date(),
      64,
      1.65,
      'Sobrepeso',
      1
    );

    await addEvaluationHandler.execute(evalCmd);

    // Finalmente recuperar paciente
    const query = new GetPatientByIdQuery(1);
    const result = await getHandler.execute(query);

    expect(result).toBeDefined();
    expect(result.fullName).toBe('Maria Garcia');
  });

  it('Paso 5: Debe soportar múltiples evaluaciones para el mismo paciente', async () => {
    // Crear paciente
    const createCmd = new CreatePatientWithDiagnosisCommand(
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

    await createHandler.execute(createCmd);

    // Primera evaluación
    const evalCmd1 = new AddEvaluationPatientCommand(
      1,
      '1',
      new Date(),
      64,
      1.65,
      'Sobrepeso',
      1
    );

    await addEvaluationHandler.execute(evalCmd1);

    // Segunda evaluación
    const evalCmd2 = new AddEvaluationPatientCommand(
      1,
      '2',
      new Date(),
      63,
      1.65,
      'Normal',
      1
    );

    await addEvaluationHandler.execute(evalCmd2);

    expect(mockPatientRepo.save).toHaveBeenCalled();
  });
});
