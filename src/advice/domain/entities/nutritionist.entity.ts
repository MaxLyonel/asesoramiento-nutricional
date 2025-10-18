import { CellPhone } from "../value-objects/cell-phone.vo";
import { IdentityCard } from "../value-objects/identity-card.vo";



export class Nutritionist {

  private assignedPatients: number[] = [];

  constructor(
    private id: number,
    private fullName: string,
    private lastName: string,
    private identityCard: IdentityCard,
    private cellPhone: CellPhone,
    private speciality: string,
  ){}

    // R1: Evitar duplicados (basado en CI)
  static ensureNotDuplicate(existingNutritionists: Nutritionist[], newNutritionist: Nutritionist) {
    const duplicated = existingNutritionists.some(n =>
      n.identityCard.equals(newNutritionist.identityCard)
    );
    if (duplicated) {
      throw new Error('Nutricionista duplicado: ya existe un registro con el mismo CI.');
    }
  }

  // R2: Asignar un paciente al nutricionista
  assignPatient(patientId: number) {
    if (this.assignedPatients.includes(patientId)) {
      throw new Error('El paciente ya está asignado a este nutricionista.');
    }
    this.assignedPatients.push(patientId);
  }

  // R3: Remover paciente asignado
  unassignPatient(patientId: number) {
    this.assignedPatients = this.assignedPatients.filter(id => id !== patientId);
  }

  getAssignedPatients(): number[] {
    return [...this.assignedPatients];
  }
}