import { Inject, Injectable } from "@nestjs/common";
import { Diagnosis } from "src/advice/domain/entities/diagnosis.entity";
import { Patient } from "src/advice/domain/entities/patient.entity";
import type { PatientRepository } from "src/advice/domain/repositories/patient.repository";
import { BodyComposition } from "src/advice/domain/value-objects/body-composition.vo";
import { CellPhone } from "src/advice/domain/value-objects/cell-phone.vo";
import { Gender } from "src/advice/domain/value-objects/gender.vo";
import { Height } from "src/advice/domain/value-objects/height.vo";
import { IdentityCard } from "src/advice/domain/value-objects/identity-card.vo";
import { Location } from "src/advice/domain/value-objects/location.vo";
import { Weight } from "src/advice/domain/value-objects/weight.vo";

@Injectable()
export class CreatePatientWithDiagnosis {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository) {}

  async execute(
    id: number, fullName: string, lastName:string,
    gender: 'M' | 'F',
    identityCard: string,
    cellPhone: string,
    location: { latitude: number, longitude: number },
    diagnosisId: string,
    weight: number,
    height: number,
    bodyComposition: string
  ): Promise<Patient> {
    const patient = new Patient(id, fullName, lastName, new Gender(gender), new IdentityCard(identityCard), new CellPhone(cellPhone), new Location(location.latitude, location.longitude));
    const diag = new Diagnosis(diagnosisId, new Weight(weight), new Height(height), new BodyComposition(bodyComposition));
    patient.setInitialDiagnosis(diag)

    this.patientRepo.save(patient)
    return patient
  }
}