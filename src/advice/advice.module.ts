import { Module } from "@nestjs/common";
import { PatienRepositoryImpl } from "./infrastructure/repositories/patient.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "./infrastructure/entities/patient.entity";
import { PatientController } from "./presentation/controllers/patient.controller";
import { CreatePatientWithDiagnosis } from './application/use-cases/create-patient-with-diagnosis';
import { AddEvaluationUseCase } from "./application/use-cases/add-evaluation-patient";


@Module({
  controllers: [PatientController],
  imports: [
    TypeOrmModule.forFeature([
      PatientEntity
    ]),
  ],
  providers: [
    CreatePatientWithDiagnosis,
    AddEvaluationUseCase,
    {
      provide: 'PatientRepository',
      useClass: PatienRepositoryImpl
    }
  ]
})
export class AdviceModule {}