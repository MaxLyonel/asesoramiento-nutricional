import { Patient } from "../entities/patient.entity";

// Capa dominio
export class EvaluationDomainService {
  // Limite máximo de evaluaciones por nutricionista por día
  static MAX_EVALUATIONS_PER_DAY = 5;

  /**
   * Valida que un nutricionista no supere el límite diario de evaluaciones
   * @param nutritionistId id del nutricionista
   * @param date fecha de la evaluación
   * @param allPatients lista de pacientes con sus evaluaciones
   */
  static ensureNutritionistLimit(
    nutritionistId: number,
    date: Date,
    allPatients: Patient[]
  ) {
    let count = 0;

    for (const patient of allPatients) {
        const evals = patient.getEvaluations().filter(e => {
          const evalDate = new Date(e.getDate()); // convierte a Date
          return evalDate.toDateString() === date.toDateString() &&
                e.getNutritionistId() === nutritionistId;
        });
        count += evals.length;
    }

    if (count >= this.MAX_EVALUATIONS_PER_DAY) {
      throw new Error(`El nutricionista ${nutritionistId} ya alcanzó el máximo de evaluaciones para ${date.toDateString()}`);
    }
  }
}
