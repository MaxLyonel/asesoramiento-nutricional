import { CellPhone } from "../value-objects/cell-phone.vo";
import { Gender } from "../value-objects/gender.vo";
import { IdentityCard } from "../value-objects/identity-card.vo";
import { Location } from "../value-objects/location.vo";
import { Diagnosis } from "./diagnosis.entity";
import { Evaluation } from "./evaluation.entity";

// agregado raiz
export class Patient {
  public diagnosis?: Diagnosis; // composicion
  public evaluations: Evaluation[] = [];

  constructor(
    private readonly id: number,
    private readonly fullName: string,
    private readonly lastName: string,
    private readonly gender: Gender,
    private readonly identityCard: IdentityCard,
    private readonly cellPhone: CellPhone,
    private readonly location: Location
  ) {}

  // R1: No duplicar paciente
  static ensureNotDuplicate(existingPatients: Patient[], newPatient: Patient) {
    const duplicated = existingPatients.some(p =>
      p.identityCard.equals(newPatient.identityCard)
    );
    if (duplicated) throw new Error('Paciente duplicado.');
  }

  // Asignar diagnóstico inicial
  setInitialDiagnosis(diagnosis: Diagnosis) {
    if (this.diagnosis) throw new Error('El paciente ya tiene un diagnóstico inicial.');
    this.diagnosis = diagnosis;
  }

  getDiagnosis(): Diagnosis | undefined { return this.diagnosis; }

  // Agregar evaluación periódica
  addEvaluation(evaluation: Evaluation) {
    // Evitar evaluaciones duplicadas en la misma fecha
    const exists = this.evaluations.some(e =>
      e.getDate().toDateString() === evaluation.getDate().toDateString()
    );
    if (exists) throw new Error(`Ya existe una evaluación para la fecha ${evaluation.getDate().toDateString()}`);

    this.evaluations.push(evaluation);
  }

  getEvaluations(): Evaluation[] { return [...this.evaluations]; }
}
