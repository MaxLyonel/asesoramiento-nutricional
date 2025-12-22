import path from 'path';
import { Pact, Matchers } from '@pact-foundation/pact';

// Using Node's global fetch (Node 18+). If your Node doesn't provide fetch, install node-fetch.
const { like, uuid } = Matchers;

const provider = new Pact({
  consumer: 'patient-consumer',
  provider: 'patient-provider',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
});

beforeAll(() => provider.setup());
afterEach(() => provider.verify());
afterAll(() => provider.finalize());

describe('Pact with patient provider (consumer)', () => {
  it('POST /patient/create - crear paciente', async () => {
    const requestBody = {
      // usar un valor concreto para la petición; los matchers se declaran en withRequest/willRespondWith
      id: 'ce118b6e-d8e1-11e7-9296-cec278b6b50a',
      fullName: 'Juan Perez',
      lastName: 'Perez',
      gender: 'M',
      identityCard: '12345678',
      cellPhone: '0999999999',
      location: 'Quito',
      diagnosisId: 1,
      weight: 70,
      height: 175,
      bodyComposition: { fat: 20 }
    };

    await provider.addInteraction({
      state: 'provider acepta creación de paciente',
      uponReceiving: 'una petición POST para crear paciente',
      withRequest: {
        method: 'POST',
        path: '/patient/create',
        headers: { 'Content-Type': 'application/json' },
        body: like(requestBody),
      },
      willRespondWith: {
        status: 201,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          status: like('success'),
          message: like('Registro exitoso'),
          data: {
            id: uuid(),
            fullName: like('Juan Perez')
          }
        }
      }
    });

    const res = await fetch('http://localhost:1234/patient/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json).toHaveProperty('status');
    expect(json).toHaveProperty('data');
  });

  it('GET /patient/:id - obtener paciente por id', async () => {
    const expectedId = 1;

    await provider.addInteraction({
      state: `existe paciente con id ${expectedId}`,
      uponReceiving: 'una petición GET para obtener paciente por id',
      withRequest: {
        method: 'GET',
        path: `/patient/${expectedId}`,
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          status: like('success'),
          message: like('Paciente obtenido exitosamente'),
          data: {
            id: expectedId,
            fullName: like('Juan Perez')
          }
        }
      }
    });

    const res = await fetch(`http://localhost:1234/patient/${expectedId}`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('data');
    expect(json.data).toHaveProperty('id');
  });
});
