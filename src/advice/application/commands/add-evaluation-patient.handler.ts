// src/advice/application/commands/add-evaluation.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Evaluation } from 'src/advice/domain/entities/evaluation.entity';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { EvaluationDomainService } from 'src/advice/domain/services/patient.service';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';
import { AddEvaluationPatientCommand } from './add-evaluation-patient.command';

@CommandHandler(AddEvaluationPatientCommand)
export class AddEvaluationPatientHandler implements ICommandHandler<AddEvaluationPatientCommand> {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository,
  ) {}

  async execute(command: AddEvaluationPatientCommand): Promise<void> {
    const {
      patientId,
      evaluationId,
      date,
      weight,
      height,
      bodyComposition,
      nutritionistId,
    } = command;

    const patient = await this.patientRepo.findById(patientId);
    if (!patient) throw new Error('Paciente no encontrado');

    const patientDomain = PatientEntity.toDomain(patient);

    const allPatients = await this.patientRepo.findAll();
    const allDomainPatients = allPatients.map(PatientEntity.toDomain);

    EvaluationDomainService.ensureNutritionistLimit(
      nutritionistId,
      new Date(date),
      allDomainPatients,
    );

    const evaluation = new Evaluation(
      evaluationId,
      new Date(date),
      new Weight(weight),
      new Height(height),
      new BodyComposition(bodyComposition),
      nutritionistId,
    );

    patientDomain.addEvaluation(evaluation);

    await this.patientRepo.save(patientDomain);
  }
}
