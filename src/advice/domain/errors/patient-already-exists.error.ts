import { BaseDomainError } from "src/shared/domain/base-domain.error";
import { IdentityCard } from "../value-objects/identity-card.vo";

export class PatientAlreadyExistsError extends BaseDomainError {
  constructor(identity: IdentityCard) {
    super(
      `Paciente con carnet ${identity.fullValue} ya existe`,
      'PATIENT_ALREADY_EXISTS',
      409
    );
  }
}