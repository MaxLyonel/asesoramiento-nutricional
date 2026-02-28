import { Module } from "@nestjs/common";
import { PatientRepositoryImpl } from "./infrastructure/repositories/patient.repository.impl";
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
import { NutritionistRepositoryImpl } from "./infrastructure/repositories/nutritionist.repository.impl";
import { NutritionistEntity } from "./infrastructure/entities/nutritionist.entity";
import { PatientAssignmentRepositoryImpl } from "./infrastructure/repositories/patient-assignment.repository.impl";
import { PatientAssignmentEntity } from "./infrastructure/entities/assigned.entity";
import { PatientUniquenessChecker } from "./domain/services/patient-unique.service";
import { PatientRepository } from "./domain/repositories/patient.repository";

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
      PatientEntity,
      NutritionistEntity,
      PatientAssignmentEntity
    ]),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: PatientUniquenessChecker,
      useFactory: (repo: PatientRepository) => {
        return new PatientUniquenessChecker(repo);
      },
      inject: ['PatientRepository'],
    },
    // CreatePatientWithDiagnosis,
    // AddEvaluationUseCase,
    {
      provide: 'PatientRepository',
      useClass: PatientRepositoryImpl
    },
    {
      provide: 'NutritionistRepository',
      useClass: NutritionistRepositoryImpl
    },
    {
      provide: 'PatientAssignmentRepository',
      useClass: PatientAssignmentRepositoryImpl
    }
  ]
})
export class AdviceModule {}