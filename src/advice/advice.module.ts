import { Module } from "@nestjs/common";
import { PatienRepositoryImpl } from "./infrastructure/repositories/patient.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "./infrastructure/entities/patient.entity";
import { PatientController } from "./presentation/controllers/patient.controller";
import { CreatePatientWithDiagnosis } from './application/use-cases/create-patient-with-diagnosis';
import { AddEvaluationUseCase } from "./application/use-cases/add-evaluation-patient";
import { CreatePatientWithDiagnosisHandler } from "./application/commands/create-patient-width-diagnosis.handler";
import { AddEvaluationPatientHandler } from "./application/commands/add-evaluation-patient.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { GetAllPatientsHandler } from "./application/queries/get-all-patients.handler";
import { GetPatientByIdHandler } from "./application/queries/get-patient-by-id.handler";

const CommandHandlers = [
  CreatePatientWithDiagnosisHandler,
  AddEvaluationPatientHandler,
];

const QueryHandlers = [
  GetAllPatientsHandler,
  GetPatientByIdHandler
];

@Module({
  controllers: [PatientController],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      PatientEntity
    ]),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    // CreatePatientWithDiagnosis,
    // AddEvaluationUseCase,
    {
      provide: 'PatientRepository',
      useClass: PatienRepositoryImpl
    }
  ]
})
export class AdviceModule {}