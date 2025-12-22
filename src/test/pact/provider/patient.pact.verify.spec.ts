import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { INestApplication } from '@nestjs/common';
import { PatientController } from '../../../advice/presentation/controllers/patient.controller';

let appInstance: INestApplication;

// Creamos una instancia ligera del provider que expone los endpoints
// necesarios, pero evitando la conexión a la base de datos. Proveemos
// implementaciones mock para CommandBus/QueryBus.
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    controllers: [PatientController],
    providers: [
      {
        provide: CommandBus,
        useValue: {
          execute: (cmd: any) => {
            return { id: 1, fullName: 'Juan Perez' };
          }
        }
      },
      {
        provide: QueryBus,
        useValue: {
          execute: (q: any) => Promise.resolve({ id: 1, fullName: 'Juan Perez' })
        }
      }
    ]
  }).compile();

  appInstance = moduleRef.createNestApplication();
  await appInstance.init();
  await appInstance.listen(8081);
});

afterAll(async () => {
  if (appInstance) await appInstance.close();
});

describe('Pact provider verification', () => {
  it('verifies the pact file produced by the consumer (simple check)', async () => {
    const pactFile = path.resolve(process.cwd(), 'pacts', 'patient-consumer-patient-provider.json');
    const pact = require(pactFile);
    const base = 'http://localhost:8081';

    // buscaremos las interacciones y haremos peticiones HTTP al provider
    for (const interaction of pact.interactions) {
      const method = interaction.request.method.toUpperCase();
      const pathUrl = interaction.request.path;
      const url = `${base}${pathUrl}`;

      let res: any;
      if (method === 'GET') {
        res = await fetch(url);
      } else if (method === 'POST') {
        const body = interaction.request.body || {};
        res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        throw new Error(`Unsupported method ${method} in pact interaction`);
      }

      // comparar status esperado
      const expectedStatus = interaction.response.status;
      expect(res.status).toBe(expectedStatus);

      // comprobar estructura mínima del body según lo esperado en el pact
      const json = await res.json();
      expect(json).toHaveProperty('status');
      expect(json).toHaveProperty('data');
    }
  }, 30000);
});
