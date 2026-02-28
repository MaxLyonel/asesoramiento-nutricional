import { PatientAlreadyExistsError } from "../errors/patient-already-exists.error";
import { PatientRepository } from "../repositories/patient.repository";
import { IdentityCard } from "../value-objects/identity-card.vo";

export class PatientUniquenessChecker {
  constructor(private readonly repo: PatientRepository) {}

  async ensureUnique(identity: IdentityCard) {
    const existing = await this.repo.findByIdentityCard(identity);
    if (existing) {
      throw new PatientAlreadyExistsError(identity);
    }
  }
}