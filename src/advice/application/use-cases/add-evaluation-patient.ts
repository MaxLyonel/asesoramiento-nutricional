import { Inject, Injectable } from "@nestjs/common";
import { Evaluation } from "src/advice/domain/entities/evaluation.entity";
import type { PatientRepository } from "src/advice/domain/repositories/patient.repository";
import { EvaluationDomainService } from "src/advice/domain/services/patient.service";
import { BodyComposition } from "src/advice/domain/value-objects/body-composition.vo";
import { Height } from "src/advice/domain/value-objects/height.vo";
import { Weight } from "src/advice/domain/value-objects/weight.vo";
import { EvaluationEntity } from "src/advice/infrastructure/entities/evaluation.entity";
import { PatientEntity } from "src/advice/infrastructure/entities/patient.entity";

@Injectable()
export class AddEvaluationUseCase {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository) {}

  async execute(
    patientId: number,
    evaluationId: string,
    date: Date,
    weight: number,
    height: number,
    bodyComposition: string,
    nutritionistId: number
  ) {
    const patient = await this.patientRepo.findById(patientId);
    const pa = PatientEntity.toDomain(patient)
    if (!patient) throw new Error('Paciente no encontrado');

    const allPatients = await this.patientRepo.findAll(); // para validar límite
    const all =allPatients.map(PatientEntity.toDomain)

    // Lógica de dominio
    EvaluationDomainService.ensureNutritionistLimit(nutritionistId, new Date(date), all);

    // Crear evaluación y agregar al paciente
    const evaluation = new Evaluation(evaluationId, date, new Weight(weight), new Height(height), new BodyComposition(bodyComposition), nutritionistId);
    // const eva = EvaluationEntity.toDomain(evaluation)
    // patient.addEvaluation(evaluation);
    // console.log(pa.addEvaluation(evaluation))
    pa.addEvaluation(evaluation)

    // await this.patientRepo.save(patient);
    console.log(patientId, weight, height, bodyComposition, nutritionistId)
    await this.patientRepo.save(pa);
  }
}
